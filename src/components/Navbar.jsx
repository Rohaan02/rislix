import { useState } from "react";
import RislixLogo from "./RislixLogo";

const services = [
  { label: "vCISO – Virtual CISO", page: "what-we-do" },
  { label: "vDPO – Virtual DPO", page: "what-we-do" },
  { label: "Governance, Risk & Compliance (GRC)", page: "what-we-do" },
  { label: "Cybersecurity Assessments & VAPT", page: "what-we-do" },
  { label: "Enterprise Security Architecture", page: "what-we-do" },
  { label: "Business Continuity & ISO 22301", page: "what-we-do" },
  { label: "AI Governance & Responsible AI", page: "what-we-do" },
  { label: "Managed Cybersecurity Advisory", page: "what-we-do" },
];

const whoWeHelp = [
  { label: "Government", page: "who-we-help" },
  { label: "Banking & Finance", page: "who-we-help" },
  { label: "Education", page: "who-we-help" },
  { label: "Telecom", page: "who-we-help" },
  { label: "Information Technology", page: "who-we-help" },
  { label: "Software & IT", page: "who-we-help" },
];

export default function Navbar({ currentPage, navigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [whoOpen, setWhoOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false);

  const navLink = (page) =>
    `px-4 py-2 font-semibold text-sm transition-colors flex items-center gap-1 ${
      currentPage === page ? "text-[#16a34a]" : "text-white hover:text-[#4ade80]"
    }`;

  return (
    <nav className="bg-[#0f172a] sticky top-0 z-50 shadow-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[76px]">

        {/* Logo */}
        <button onClick={() => navigate("home")} className="flex-shrink-0">
          <RislixLogo size={46} showText={true} textSize="lg" />
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 ml-6">
          {/* Home */}
          <button
            onClick={() => navigate("home")}
            title="Home"
            className={`p-2 transition-colors ${currentPage === "home" ? "text-[#16a34a]" : "text-white hover:text-[#4ade80]"}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
          </button>

          {/* What We Do */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className={navLink("what-we-do")}>
              What We Do
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 bg-[#0f172a] border border-white/10 shadow-2xl rounded-xl py-2 w-80 z-50">
                {services.map((s, i) => (
                  <button key={i} onClick={() => { navigate(s.page); setServicesOpen(false); }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-slate-300 hover:text-[#4ade80] hover:bg-white/5 transition-colors">
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Who We Help */}
          <div className="relative" onMouseEnter={() => setWhoOpen(true)} onMouseLeave={() => setWhoOpen(false)}>
            <button className={navLink("who-we-help")}>
              Who We Help
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
            </button>
            {whoOpen && (
              <div className="absolute top-full left-0 bg-[#0f172a] border border-white/10 shadow-2xl rounded-xl py-2 w-56 z-50">
                {whoWeHelp.map((s, i) => (
                  <button key={i} onClick={() => { navigate(s.page); setWhoOpen(false); }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-slate-300 hover:text-[#4ade80] hover:bg-white/5 transition-colors">
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate("pricing")} className={navLink("pricing")}>Pricing</button>

          {/* CTA button - green */}
          <button
            onClick={() => navigate("contact")}
            className="ml-4 bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-green-900/30"
          >
            Get a Free Assessment
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0f172a] border-t border-white/10 px-4 py-4 space-y-1">
          <button onClick={() => { navigate("home"); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-white font-semibold hover:text-[#4ade80]">Home</button>

          <div>
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex items-center justify-between w-full px-3 py-2 text-white font-semibold hover:text-[#4ade80]">
              What We Do
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileServicesOpen ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"}/></svg>
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-1 pb-1">
                {services.map((s, i) => <button key={i} onClick={() => { navigate(s.page); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-[#4ade80]">{s.label}</button>)}
              </div>
            )}
          </div>

          <div>
            <button onClick={() => setMobileWhoOpen(!mobileWhoOpen)} className="flex items-center justify-between w-full px-3 py-2 text-white font-semibold hover:text-[#4ade80]">
              Who We Help
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileWhoOpen ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"}/></svg>
            </button>
            {mobileWhoOpen && (
              <div className="pl-4 space-y-1 pb-1">
                {whoWeHelp.map((s, i) => <button key={i} onClick={() => { navigate(s.page); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-[#4ade80]">{s.label}</button>)}
              </div>
            )}
          </div>

          {[["pricing","Pricing"],["case-studies","Case Studies"],["about-us","About Us"],["knowledge-centre","Knowledge Centre"],["contact","Contact"]].map(([page, label]) => (
            <button key={page} onClick={() => { navigate(page); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-white font-semibold hover:text-[#4ade80]">{label}</button>
          ))}

          <button onClick={() => { navigate("contact"); setMobileOpen(false); }} className="w-full mt-2 bg-[#16a34a] hover:bg-[#15803d] text-white py-3 rounded-lg font-bold transition-colors">
            Get a Free Assessment
          </button>
        </div>
      )}
    </nav>
  );
}
