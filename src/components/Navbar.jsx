import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Technologies", href: "#technologies" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Careers", href: "#careers" },
  { label: "Blog", href: "#blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white text-lg heading-font">
            V
          </div>
          <span className="text-xl font-bold heading-font text-white">
            Vaival
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link text-sm text-gray-300 hover:text-white transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="text-sm text-gray-300 hover:text-white transition font-medium"
          >
            Contact
          </a>
          <a
            href="#contact"
            className="glow-btn px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl text-sm font-semibold text-white"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
        >
          <div
            className={`w-5 h-0.5 bg-white mb-1 transition-all ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></div>
          <div
            className={`w-5 h-0.5 bg-white mb-1 transition-all ${
              open ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`w-5 h-0.5 bg-white transition-all ${
              open ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0D0D15] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-gray-300 hover:text-white font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="glow-btn text-center px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl text-sm font-semibold text-white mt-2"
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
