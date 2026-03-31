import { useState } from "react";

export default function ContactForm({ dark = false }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.errors?.[0]?.msg || data.message);
      }

      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const labelClass = `block text-sm font-medium mb-1 ${
    dark ? "text-slate-300" : "text-gray-700"
  }`;

  const inputClass = `w-full px-4 py-3 rounded-lg border ${
    dark
      ? "bg-white/10 border-white/20 text-white placeholder-slate-400 focus:border-[#16a34a]"
      : "bg-white border-gray-200 text-gray-800 focus:border-[#16a34a]"
  } outline-none transition-colors text-sm`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ✅ Success Message */}
      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          ✅ Message sent! We'll get back to you within one business day.
        </div>
      )}

      {/* ❌ Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          ❌ {error}
        </div>
      )}

      <div>
        <label className={labelClass}>
          Name <span className="text-red-400">*</span>
        </label>
        <input
          required
          className={inputClass}
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div>
        <label className={labelClass}>
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          required
          className={inputClass}
          placeholder="+44 ..."
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>

      <div>
        <label className={labelClass}>
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          required
          type="email"
          className={inputClass}
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <div>
        <label className={labelClass}>Message</label>
        <textarea
          rows={4}
          className={inputClass}
          placeholder="How can we help?"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-lg font-bold transition-colors ${
          loading
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-[#16a34a] hover:bg-[#15803d] text-white"
        }`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
