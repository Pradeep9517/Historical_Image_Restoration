import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Footer() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");

    setTimeout(() => {
      const authSection = document.getElementById("auth-section");
      if (authSection) {
        authSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <footer className="bg-slate-900/90 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left - Logo + Title */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-md object-cover"
            />
            <h2 className="text-lg font-semibold text-emerald-400 tracking-wide">
              Historical Image Restoration
            </h2>
          </div>

          {/* Center - Navigation */}
          <div className="flex flex-wrap gap-5 text-sm text-slate-300">
            <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
            <Link to="/about" className="hover:text-emerald-400 transition">About</Link>
            <Link to="/contact" className="hover:text-emerald-400 transition">Contact</Link>
            <button
              onClick={handleLoginClick}
              className="hover:text-emerald-400 transition"
            >
              Login
            </button>
          </div>

          {/* Right - Social icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white transition"
            >
              🐱
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white transition font-bold"
            >
              in
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white transition font-semibold"
            >
              X
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Historical Image Restoration — All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
