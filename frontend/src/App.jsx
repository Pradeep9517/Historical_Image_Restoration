import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ImageUpload from "./components/ImageUpload";
import PreviewPane from "./components/PreviewPane";
import UserGallery from "./components/UserGallery";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks"
import AuthPanel from "./components/AuthPanel";

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [restoredImage, setRestoredImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const handleOriginalSelect = (file) => {
    const url = URL.createObjectURL(file);
    setOriginalImage(url);
    setRestoredImage(null);
  };

  const handleUploadSuccess = (origFile, restoredBlob) => {
    const origUrl = URL.createObjectURL(origFile);
    const restoredUrl = URL.createObjectURL(restoredBlob);

    setOriginalImage(origUrl);
    setRestoredImage(restoredUrl);

    if (token) {
      loadUserHistory(token);
    }
  };

  const handleDownload = () => {
    if (!restoredImage) return;
    const a = document.createElement("a");
    a.href = restoredImage;
    a.download = "restored-image.jpg";
    a.click();
  };

  const loadUserHistory = async (jwtToken) => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery/me", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (!res.ok) throw new Error("Failed to load gallery");
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLoginSuccess = (data) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    loadUserHistory(data.token);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setHistory([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (token) {
      loadUserHistory(token);
    }
  }, [token]);

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
       
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6 md:px-8 md:py-8">
              <header className="text-center mb-6 md:mb-8">
                
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Historical Image Restoration
                </h1>
                <p className="mt-2 text-slate-300 text-sm md:text-base">
                  Upload damaged photos and restore them using AI.
                </p>
                <HowItWorks/>
              </header>

              {/* Agar login nahi hai toh Auth panel dikhaye */}
              {!token ? (
                <div id="auth-section">
                  <AuthPanel onLoginSuccess={handleLoginSuccess} />
                </div>
              ) : (
                <>
                  <main className="max-w-6xl mx-auto grid gap-4 md:gap-6 md:grid-cols-[1.1fr_1.9fr]">
                    <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
                      <h2 className="text-lg font-semibold mb-3">
                        Upload & Restore
                      </h2>
                      <ImageUpload
                        onSuccess={handleUploadSuccess}
                        onOriginalSelect={handleOriginalSelect}
                        onProcessingChange={setIsProcessing}
                        token={token}
                      />
                    </section>

                    <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl">
                      <h2 className="text-lg font-semibold mb-3">Preview</h2>
                      <PreviewPane
                        originalImage={originalImage}
                        restoredImage={restoredImage}
                        isProcessing={isProcessing}
                        onDownload={handleDownload}
                      />
                    </section>
                  </main>

                  <UserGallery history={history} />
                </>
              )}
            </div>
          }
        />

        {/* ABOUT PAGE */}
        <Route
          path="/about"
          element={
            <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6 md:px-8 md:py-8">
              <AboutSection />
            </div>
          }
        />

        {/* CONTACT PAGE */}
        <Route
          path="/contact"
          element={
            <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-6 md:px-8 md:py-8">
              <ContactSection />
            </div>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
