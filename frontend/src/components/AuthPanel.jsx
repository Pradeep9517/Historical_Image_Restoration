import React, { useState } from "react";

function AuthPanel({ onLoginSuccess }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "register") {
        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");
        alert("Registration successful! Now login.");
        setMode("login");
      } else {
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");
        onLoginSuccess(data);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl mb-6">
      <div className="flex justify-between mb-4">
        <button
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            mode === "login"
              ? "bg-emerald-500 text-slate-950"
              : "text-slate-300"
          }`}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            mode === "register"
              ? "bg-emerald-500 text-slate-950"
              : "text-slate-300"
          }`}
          onClick={() => setMode("register")}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "register" && (
          <div className="space-y-1">
            <label className="text-sm text-slate-200">Name</label>
            <input
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={mode === "register"}
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-sm text-slate-200">Email</label>
          <input
            type="email"
            className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-200">Password</label>
          <input
            type="password"
            className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          className="w-full mt-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-slate-950"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}

export default AuthPanel;
