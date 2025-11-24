import React from "react";

function AboutSection() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto mt-10 md:mt-14 px-4 md:px-0"
    >
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-3">
        <h2 className="text-xl md:text-2xl font-semibold text-emerald-400">
          About Project
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          ImageRestore AI is a web application that restores old, damaged or
          scratched historical photos using deep learning. Users can upload a
          scanned image and get a digitally enhanced version with reduced
          scratches and improved visual quality.
        </p>
        <p className="text-sm md:text-base text-slate-400">
          The project uses a React + Tailwind frontend and a Node + Python
          backend. The Python side runs an AI model (ZeroScratches) to detect
          and repair scratches from the image and sends the restored image back
          to the browser.
        </p>
        <p className="text-xs md:text-sm text-slate-500">
          This project can be extended with features like user login, cloud
          storage of restored images, gallery, download as ZIP, and more.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
