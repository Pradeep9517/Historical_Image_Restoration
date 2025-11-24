import React from "react";

function ContactSection() {
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto mt-10 md:mt-14 px-4 md:px-0 mb-10"
    >
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl grid gap-6 md:grid-cols-[1.2fr_1.3fr]">
        
        {/* Left: Text / Info */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-semibold text-emerald-400">
            Contact
          </h2>
          <p className="text-sm md:text-base text-slate-300">
            If you have any feedback, suggestions, or want to collaborate on
            improving this historical image restoration project, feel free to
            reach out.
          </p>
          <div className="space-y-1 text-sm text-slate-300">
            <p><span className="text-slate-400">Email:</span> yourmail@example.com</p>
            <p><span className="text-slate-400">GitHub:</span> github.com/your-username</p>
            <p><span className="text-slate-400">LinkedIn:</span> linkedin.com/in/your-profile</p>
          </div>
        </div>

        {/* Right: Simple contact form UI (frontend only) */}
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            alert("This is a demo form. Add backend emailing later.");
          }}
        >
          <div className="space-y-1">
            <label className="text-sm text-slate-200">Name</label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-200">Email</label>
            <input
              type="email"
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-200">Message</label>
            <textarea
              rows={4}
              className="w-full rounded-xl bg-slate-950/70 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold text-slate-950 transition shadow-lg shadow-emerald-400/30"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default ContactSection;
