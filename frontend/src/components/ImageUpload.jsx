import React, { useState, useEffect } from "react";

function ImageUpload({ onSuccess, onOriginalSelect, onProcessingChange, token }) {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (onProcessingChange) onProcessingChange(isProcessing);
  }, [isProcessing, onProcessingChange]);

  const handleFileChange = (e) => {
    setError("");
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setFile(selected);

    if (onOriginalSelect) {
      onOriginalSelect(selected);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose an image first.");
      return;
    }
    if (!token) {
      setError("Please login before restoring image.");
      return;
    }

    try {
      setIsProcessing(true);
      setError("");

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:5000/api/restore", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Server error while restoring image");
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        throw new Error(data.detail || data.error || "Unexpected JSON response");
      } else {
        const restoredBlob = await response.blob();
        onSuccess(file, restoredBlob);
      }

      setFile(null);
      e.target.reset();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block border-2 border-dashed border-slate-600/80 hover:border-slate-400 transition-colors rounded-2xl p-6 text-center cursor-pointer bg-slate-900/60">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center gap-1 text-sm text-slate-300">
          <span className="font-medium">
            {file ? file.name : "Click to choose or drop an image here"}
          </span>
          <span className="text-xs text-slate-400">
            Large images may take 10–20 seconds to restore.
          </span>
        </div>
      </label>

      {error && (
        <p className="text-sm text-red-400 bg-red-950/40 border border-red-800/50 rounded-xl px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-emerald-500/30"
      >
        {isProcessing ? "Restoring..." : "Restore Image"}
      </button>
    </form>
  );
}

export default ImageUpload;
