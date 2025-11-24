import React from "react";

function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto mt-14 mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-10">
        How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Step 1 */}
        <div className="p-6 rounded-2xl border border-slate-700 bg-slate-900/50 shadow-lg hover:shadow-emerald-500/20 transition">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 text-slate-900 flex items-center justify-center text-xl font-bold">
            1
          </div>
          <p className="text-slate-300 text-sm font-medium">
            Upload your old or damaged photo
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 rounded-2xl border border-slate-700 bg-slate-900/50 shadow-lg hover:shadow-emerald-500/20 transition">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 text-slate-900 flex items-center justify-center text-xl font-bold">
            2
          </div>
          <p className="text-slate-300 text-sm font-medium">
            Our AI removes scratches and restores lost details
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 rounded-2xl border border-slate-700 bg-slate-900/50 shadow-lg hover:shadow-emerald-500/20 transition">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 text-slate-900 flex items-center justify-center text-xl font-bold">
            3
          </div>
          <p className="text-slate-300 text-sm font-medium">
            Download your beautifully restored image
          </p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;
