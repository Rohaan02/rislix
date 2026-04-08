import { useState } from "react";

// 🔧 API Base URL helper
const getApiBaseUrl = () => {
  const currentUrl = window.location.hostname;

  if (currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
    return "http://localhost:3000";
  }

  if (currentUrl.includes("rislix.com")) {
    return "https://rislix.com";
  }

  return "https://rislix.com";
};

const API_BASE_URL = getApiBaseUrl();

export default function ContactForm({ dark = false }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // ✅ Success
      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", message: "" });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error:", error.message);
      alert("❌ Failed to send message. Please try again.");
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
      {submitted && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          ✅ Message sent! We'll get back to you within one business day.
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
          dark
            ? "bg-[#16a34a] hover:bg-[#15803d] text-white"
            : "bg-[#16a34a] hover:bg-[#15803d] text-white"
        } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
