import { useState } from "react";
import rislixLogo from "../assets/Rislix Cyber Security Logo.jpeg";

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

function RislixLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
        <img
          src={rislixLogo}
          alt="Rislix Cyber Security Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-white font-black text-2xl tracking-widest uppercase">
          RISLIX
        </span>
        <span className="text-[#f5a623] font-bold text-[10px] tracking-[0.25em] uppercase">
          Cyber · Privacy · GRC
        </span>
      </div>
    </div>
  );
}

export default function Navbar({ currentPage, navigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [whoOpen, setWhoOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false);

  const navLinkClass = (page) =>
    `px-4 py-2 font-semibold text-sm transition-colors flex items-center gap-1 ${
      currentPage === page
        ? "text-[#f5a623]"
        : "text-white hover:text-[#f5a623]"
    }`;

  return (
    <nav className="bg-[#0d1b2a] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
        <button onClick={() => navigate("home")} className="flex-shrink-0">
          <RislixLogo />
        </button>

        <div className="hidden lg:flex items-center gap-1 ml-8">
          <button
            onClick={() => navigate("home")}
            className={`p-2 transition-colors ${
              currentPage === "home"
                ? "text-[#f5a623]"
                : "text-white hover:text-[#f5a623]"
            }`}
            title="Home"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </button>

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className={navLinkClass("what-we-do")}>
              What We Do{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 bg-[#0d1b2a] border border-[#ffffff15] shadow-2xl rounded-lg py-2 w-80 z-50">
                {services.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(s.page);
                      setServicesOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-gray-300 hover:text-[#f5a623] hover:bg-[#ffffff08] transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setWhoOpen(true)}
            onMouseLeave={() => setWhoOpen(false)}
          >
            <button className={navLinkClass("who-we-help")}>
              Who We Help{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {whoOpen && (
              <div className="absolute top-full left-0 bg-[#0d1b2a] border border-[#ffffff15] shadow-2xl rounded-lg py-2 w-56 z-50">
                {whoWeHelp.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(s.page);
                      setWhoOpen(false);
                    }}
                    className="block w-full text-left px-5 py-2.5 text-sm text-gray-300 hover:text-[#f5a623] hover:bg-[#ffffff08] transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("pricing")}
            className={navLinkClass("pricing")}
          >
            Pricing
          </button>

          <button
            onClick={() => navigate("contact")}
            className="ml-4 bg-[#f5a623] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#e09415] transition-colors shadow-lg shadow-[#f5a62330]"
          >
            Get a Free Assessment
          </button>
        </div>

        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#0d1b2a] border-t border-[#ffffff10] px-4 py-4 space-y-1">
          <button
            onClick={() => {
              navigate("home");
              setMobileOpen(false);
            }}
            className="block w-full text-left px-3 py-2 text-white font-semibold hover:text-[#f5a623] transition-colors"
          >
            Home
          </button>
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-white font-semibold hover:text-[#f5a623]"
            >
              What We Do{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileServicesOpen ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-1 pb-1">
                {services.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(s.page);
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-[#f5a623]"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => setMobileWhoOpen(!mobileWhoOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-white font-semibold hover:text-[#f5a623]"
            >
              Who We Help{" "}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileWhoOpen ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>
            {mobileWhoOpen && (
              <div className="pl-4 space-y-1 pb-1">
                {whoWeHelp.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(s.page);
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-[#f5a623]"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {[
            ["pricing", "Pricing"],
            ["case-studies", "Case Studies"],
            ["about-us", "About Us"],
            ["knowledge-centre", "Knowledge Centre"],
            ["contact", "Contact"],
          ].map(([page, label]) => (
            <button
              key={page}
              onClick={() => {
                navigate(page);
                setMobileOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-white font-semibold hover:text-[#f5a623]"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => {
              navigate("contact");
              setMobileOpen(false);
            }}
            className="w-full mt-2 bg-[#f5a623] text-white py-3 rounded-full font-bold hover:bg-[#e09415] transition-colors"
          >
            Get a Free Assessment
          </button>
        </div>
      )}
    </nav>
  );
}
