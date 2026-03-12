import { useState } from "react";
import Button from "./Button";

export default function ContactForm({ dark = false }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  const labelClass = `block text-sm font-medium mb-1 ${dark ? "text-gray-300" : "text-gray-700"}`;
  const inputClass = `w-full px-4 py-3 rounded-xl border ${dark ? "bg-[#ffffff10] border-[#ffffff20] text-white placeholder-gray-400 focus:border-[#f5a623]" : "bg-white border-gray-200 text-gray-800 focus:border-[#f5a623]"} outline-none transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitted && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">Message sent! We'll get back to you soon.</div>}
      <div>
        <label className={labelClass}>Name <span className="text-red-400">*</span></label>
        <input required className={inputClass} placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      </div>
      <div>
        <label className={labelClass}>Phone Number <span className="text-red-400">*</span></label>
        <input required className={inputClass} placeholder="+44 ..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
      </div>
      <div>
        <label className={labelClass}>Email Address <span className="text-red-400">*</span></label>
        <input required type="email" className={inputClass} placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea rows={4} className={inputClass} placeholder="How can we help?" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
      </div>
      <Button variant={dark ? "white" : "primary"} size="md" className="w-full">Send Message</Button>
    </form>
  );
}
