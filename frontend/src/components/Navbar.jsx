import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Pehle home page pe le jao
    navigate("/");

    // Thoda delay dekar auth section pe scroll
    setTimeout(() => {
      const authSection = document.getElementById("auth-section");
      if (authSection) {
        authSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 rounded-md object-cover"
          />
          <h1 className="text-lg md:text-xl font-bold text-emerald-400 tracking-wide">
            Historical Image Restoration
          </h1>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-slate-200 text-sm font-medium">
          <Link to="/" className="hover:text-emerald-400 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-emerald-400 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-emerald-400 transition">
            Contact
          </Link>

          {user ? (
            <>
              <span className="text-xs text-slate-400 mr-2">
                Hello,{" "}
                <span className="text-slate-100 font-semibold">
                  {user.name}
                </span>
              </span>
              <button
                onClick={onLogout}
                className="px-5 py-1.5 bg-red-500 hover:bg-red-400 rounded-full font-semibold transition shadow-md shadow-red-400/30 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-5 py-1.5 bg-emerald-500 hover:bg-emerald-400 rounded-full font-semibold transition shadow-md shadow-emerald-400/30 text-sm"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-200 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 space-y-3 text-slate-200 text-sm">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-emerald-400 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block hover:text-emerald-400 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block hover:text-emerald-400 transition"
          >
            Contact
          </Link>

          {user ? (
            <div className="pt-2 border-t border-slate-800 mt-2">
              <p className="text-xs text-slate-400 mb-2">
                Logged in as{" "}
                <span className="text-slate-100 font-semibold">
                  {user.name}
                </span>
              </p>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout && onLogout();
                }}
                className="w-full px-5 py-2 bg-red-500 hover:bg-red-400 rounded-full font-semibold transition shadow-md shadow-red-400/30"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                handleLoginClick();
              }}
              className="w-full mt-2 px-5 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-full font-semibold transition shadow-md shadow-emerald-400/30"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
