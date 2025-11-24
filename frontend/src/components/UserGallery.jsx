import React from "react";

function UserGallery({ history }) {
  if (!history || history.length === 0) {
    return (
      <section className="max-w-6xl mx-auto mt-8">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5">
          <h2 className="text-lg font-semibold mb-2 text-slate-100">
            Your Restored Images
          </h2>
          <p className="text-sm text-slate-400">
            No restored images yet. Restore an image to see it in your gallery.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto mt-8">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5">
        <h2 className="text-lg font-semibold mb-4 text-slate-100">
          Your Restored Images
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-emerald-500/20 transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.restoredUrl}
                  alt="Restored"
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform"
                />
              </div>
              <div className="p-2.5 space-y-1">
                <p className="text-xs text-slate-300">Restored preview</p>
                <p className="text-[10px] text-slate-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserGallery;
