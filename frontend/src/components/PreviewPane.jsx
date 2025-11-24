import React from "react";
import Spinner from "./Spinner";

function PreviewPane({ originalImage, restoredImage, isProcessing, onDownload }) {
  if (!originalImage) {
    return (
      <p className="text-sm text-slate-400">
        No image selected. Upload an image to preview.
      </p>
    );
  }

  if (originalImage && !restoredImage && !isProcessing) {
    return (
      <div>
        <h3 className="text-sm mb-2 text-slate-200 font-semibold">Original</h3>
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
          <img
            src={originalImage}
            alt="Original"
            className="w-full max-h-80 object-contain"
          />
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div>
        <h3 className="text-sm mb-2 text-slate-200 font-semibold">
          Restoring...
        </h3>
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
          <img
            src={originalImage}
            alt="Original"
            className="w-full max-h-80 object-contain opacity-40 blur-sm"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  if (originalImage && restoredImage) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm mb-2 text-slate-200 font-semibold">
              Original
            </h3>
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
              <img
                src={originalImage}
                alt="Original"
                className="w-full max-h-80 object-contain"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm mb-2 text-slate-200 font-semibold">
              Restored
            </h3>
            <div className="relative overflow-hidden rounded-xl border border-emerald-700 bg-slate-950/60 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              <img
                src={restoredImage}
                alt="Restored"
                className="w-full max-h-80 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={onDownload}
          className="w-full md:w-auto px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-400/30 transition"
        >
          ⬇ Download Restored Image
        </button>
      </div>
    );
  }

  return null;
}

export default PreviewPane;
