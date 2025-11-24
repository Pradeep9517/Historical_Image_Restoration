import React from "react";

function HistoryGallery({ history }) {
  if (!history.length) {
    return (
      <p className="text-sm text-slate-400">
        No history yet. Restore some images!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {history.map((item) => (
        <div
          key={item.id}
          className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950/70"
        >
          <img
            src={item.restored}
            alt="Restored history"
            className="w-full h-24 sm:h-28 md:h-28 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </div>
  );
}

export default HistoryGallery;
