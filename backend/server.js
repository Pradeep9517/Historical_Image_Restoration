import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// ---------- MongoDB connection ----------
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "image_restore_db",
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------- Schemas & Models ----------
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const restorationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  originalFile: { type: String, required: true },
  restoredFile: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Restoration = mongoose.model("Restoration", restorationSchema);

// ---------- Middlewares ----------
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ensure upload dir
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname) || ".png";
    cb(null, unique + ext);
  },
});

const upload = multer({ storage });

// Auth middleware (JWT verify)
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId, email }
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Python path (.venv ka)
const pythonPath = path.join(__dirname, ".venv", "Scripts", "python.exe");

// ---------- Routes ----------

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Historical Image Restoration backend running" });
});

// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/**
 * POST /api/restore (Protected)
 * FormData: { image: <file> }
 */
app.post(
  "/api/restore",
  authMiddleware,
  upload.single("image"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const userId = req.user.userId; // JWT se
      const inputFileName = req.file.filename;
      const inputPath = req.file.path;
      const ext = path.extname(inputFileName) || ".png";

      const outputFileName = "restored-" + inputFileName;
      const outputPath = path.join(uploadDir, outputFileName);

      console.log("Input image:", inputPath);
      console.log("Output image (expected):", outputPath);

      const pythonProcess = spawn(pythonPath, [
        path.join(__dirname, "restore.py"),
        inputPath,
        outputPath,
      ]);

      pythonProcess.stdout.on("data", (data) => {
        console.log("[PYTHON]", data.toString());
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error("[PYTHON ERROR]", data.toString());
      });

      pythonProcess.on("close", async (code) => {
        if (code !== 0) {
          console.error("Python script exited with code", code);
          return res
            .status(500)
            .json({ error: "Image restoration failed in Python script" });
        }

        if (!fs.existsSync(outputPath)) {
          return res
            .status(500)
            .json({ error: "Restored image not found after processing" });
        }

        // MongoDB me save
        try {
          await Restoration.create({
            userId,
            originalFile: inputFileName,
            restoredFile: outputFileName,
          });
        } catch (dbErr) {
          console.error("Error saving restoration to DB:", dbErr);
        }

        let mimeType = "image/png";
        if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";

        res.setHeader("Content-Type", mimeType);

        const readStream = fs.createReadStream(outputPath);
        readStream.on("error", (err) => {
          console.error("Error reading restored image:", err);
          res.status(500).end();
        });

        readStream.pipe(res);
      });
    } catch (error) {
      console.error("Error in /api/restore:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

/**
 * GET /api/gallery/me (Protected)
 */
app.get("/api/gallery/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const items = await Restoration.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const data = items.map((item) => ({
      id: item._id.toString(),
      originalUrl: `${BASE_URL}/uploads/${item.originalFile}`,
      restoredUrl: `${BASE_URL}/uploads/${item.restoredFile}`,
      createdAt: item.createdAt,
    }));

    res.json(data);
  } catch (err) {
    console.error("Gallery fetch error:", err);
    res.status(500).json({ error: "Failed to fetch gallery" });
  }
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`Backend server running on ${BASE_URL}`);
});
