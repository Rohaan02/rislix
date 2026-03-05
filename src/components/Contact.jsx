import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 via-transparent to-cyan-600/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-px section-divider"></div>

      <div className="max-w-5xl mx-auto px-6 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4">
          Let's Build Together
        </div>
        <h2 className="heading-font text-4xl lg:text-5xl font-extrabold text-white mb-5">
          Start Your <span className="gradient-text">Next Project</span> Today
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Tell us about your project and we'll get back to you within 24 hours with a free consultation.
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        {!submitted ? (
          <form onSubmit={submit} className="bg-white/[0.03] border border-white/8 rounded-3xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-gray-400 font-medium block mb-2">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handle}
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 transition"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 font-medium block mb-2">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handle}
                  required
                  placeholder="jane@company.com"
                  className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 transition"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-400 font-medium block mb-2">Project Details</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                required
                rows={5}
                placeholder="Tell us about your project, goals, and timeline..."
                className="w-full bg-white/[0.04] border border-white/8 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-indigo-500/50 transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="glow-btn w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl text-white font-bold text-sm"
            >
              Send Message →
            </button>
          </form>
        ) : (
          <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-12 text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="heading-font text-2xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-gray-400">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
          </div>
        )}
      </div>
    </section>
  );
}
