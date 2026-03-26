import { useState, useRef } from "react"; // Add useRef
import RislixLogo from "./RislixLogo";

const services = [
  { label: "vCISO – Virtual CISO", page: "what-we-do#vciso" },
  { label: "vDPO – Virtual DPO", page: "what-we-do#vdpo" },
  { label: "Governance, Risk & Compliance (GRC)", page: "what-we-do#grc" },
  { label: "Cybersecurity Assessments & VAPT", page: "what-we-do#vapt" },
  {
    label: "Enterprise Security Architecture",
    page: "what-we-do#architecture",
  },
  {
    label: "Business Continuity & ISO 22301",
    page: "what-we-do#business-continuity",
  },
  { label: "AI Governance & Responsible AI", page: "what-we-do#ai-governance" },
  {
    label: "Managed Cybersecurity Advisory",
    page: "what-we-do#managed-advisory",
  },
];

const whoWeHelp = [
  { label: "Government", page: "who-we-help#government" },
  { label: "Banking & Finance", page: "who-we-help#banking" },
  { label: "Education", page: "who-we-help#education" },
  { label: "Telecom", page: "who-we-help#telecom" },
  {
    label: "Information Technology",
    page: "who-we-help#information-technology",
  },
  { label: "Software & IT", page: "who-we-help#software-it" },
];

const ChevronDown = () => (
  <svg
    className="w-3.5 h-3.5 opacity-70"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default function Navbar({ currentPage, navigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [whoOpen, setWhoOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false);

  // Use refs for timers
  const servicesTimer = useRef(null);
  const whoTimer = useRef(null);

  const isActive = (page) => currentPage === page;

  const navLinkClass = (page) =>
    `px-4 py-2 font-semibold text-sm transition-all duration-200 flex items-center gap-1.5 rounded-lg ${
      isActive(page)
        ? "bg-white/20 text-white shadow-inner"
        : "text-white/80 hover:text-white hover:bg-white/10"
    }`;

  /* Dropdown panel shared style */
  const dropdownClass =
    "absolute top-[calc(100%+8px)] left-0 bg-[#0f1f3d] border border-white/10 shadow-2xl shadow-black/40 rounded-xl py-2 z-50 backdrop-blur-md min-w-[280px]";

  // Handlers for Services dropdown
  const handleServicesMouseEnter = () => {
    if (servicesTimer.current) {
      clearTimeout(servicesTimer.current);
      servicesTimer.current = null;
    }
    setServicesOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimer.current = setTimeout(() => {
      setServicesOpen(false);
    }, 150); // 150ms delay - enough time to move mouse to dropdown
  };

  // Handlers for Who We Help dropdown
  const handleWhoMouseEnter = () => {
    if (whoTimer.current) {
      clearTimeout(whoTimer.current);
      whoTimer.current = null;
    }
    setWhoOpen(true);
  };

  const handleWhoMouseLeave = () => {
    whoTimer.current = setTimeout(() => {
      setWhoOpen(false);
    }, 150);
  };

  // Handle main button click for What We Do
  const handleWhatWeDoClick = () => {
    navigate("what-we-do");
    setServicesOpen(false);
  };

  // Handle main button click for Who We Help
  const handleWhoWeHelpClick = () => {
    navigate("who-we-help");
    setWhoOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 shadow-xl"
      style={{
        background:
          "linear-gradient(110deg, #fff 0%, #166534 70%, #16a34a 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* subtle inner highlight line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[76px]">
        {/* ── Logo ── */}
        <button
          onClick={() => navigate("home")}
          className="flex-shrink-0 hover:opacity-90 transition-opacity"
        >
          <RislixLogo size={46} showText={true} textSize="lg" />
        </button>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex items-center gap-0.5">
          {/* Home icon */}
          <button
            onClick={() => navigate("home")}
            title="Home"
            className={`p-2.5 rounded-lg transition-all duration-200 ${
              isActive("home")
                ? "bg-white/20 text-white"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </button>

          {/* ── What We Do dropdown ── */}
          <div
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
          >
            <button
              onClick={handleWhatWeDoClick}
              className={navLinkClass("what-we-do")}
            >
              What We Do <ChevronDown />
            </button>
            {servicesOpen && (
              <div
                className={dropdownClass}
                onMouseEnter={handleServicesMouseEnter}
                onMouseLeave={handleServicesMouseLeave}
              >
                {/* dropdown header accent */}
                <div className="px-4 pb-2 mb-1 border-b border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
                    Our Services
                  </span>
                </div>
                {services.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(s.page);
                      setServicesOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:bg-green-400 shrink-0 transition-colors" />
                    {s.label}
                  </button>
                ))}
                {/* Add "View All Services" link */}
                <div className="mt-2 pt-2 border-t border-white/10 px-4 py-2">
                  <button
                    onClick={() => {
                      navigate("what-we-do");
                      setServicesOpen(false);
                    }}
                    className="text-xs text-green-400 hover:text-green-300 font-semibold flex items-center gap-1 w-full"
                  >
                    View all services →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Who We Help dropdown ── */}
          <div
            className="relative"
            onMouseEnter={handleWhoMouseEnter}
            onMouseLeave={handleWhoMouseLeave}
          >
            <button
              onClick={handleWhoWeHelpClick}
              className={navLinkClass("who-we-help")}
            >
              Who We Help <ChevronDown />
            </button>
            {whoOpen && (
              <div
                className={dropdownClass}
                onMouseEnter={handleWhoMouseEnter}
                onMouseLeave={handleWhoMouseLeave}
              >
                <div className="px-4 pb-2 mb-1 border-b border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                    Industries
                  </span>
                </div>
                {whoWeHelp.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(s.page);
                      setWhoOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/8 transition-colors group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-blue-300 shrink-0 transition-colors" />
                    {s.label}
                  </button>
                ))}
                {/* Add "View All Industries" link */}
                <div className="mt-2 pt-2 border-t border-white/10 px-4 py-2">
                  <button
                    onClick={() => {
                      navigate("who-we-help");
                      setWhoOpen(false);
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 w-full"
                  >
                    View all industries →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Pricing */}
          <button
            onClick={() => navigate("pricing")}
            className={navLinkClass("pricing")}
          >
            Pricing
          </button>

          {/* ── CTA Button ── */}
          <button
            onClick={() => navigate("contact")}
            className="ml-3 relative overflow-hidden bg-white text-[#16a34a] px-6 py-2.5 rounded-lg font-black text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:bg-green-50 group"
          >
            {/* animated shimmer */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-green-100/60 to-transparent skew-x-12 pointer-events-none" />
            Get a Free Assessment
          </button>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="lg:hidden p-2 text-white/90 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
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

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t border-white/10 px-4 py-4 space-y-1"
          style={{
            background: "rgba(15,31,61,0.97)",
            backdropFilter: "blur(12px)",
          }}
        >
          <button
            onClick={() => {
              navigate("home");
              setMobileOpen(false);
            }}
            className="block w-full text-left px-3 py-2.5 text-white font-semibold hover:text-green-400 transition-colors rounded-lg hover:bg-white/5"
          >
            Home
          </button>

          {/* What We Do accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="flex items-center justify-between w-full px-3 py-2.5 text-white font-semibold hover:text-green-400 transition-colors rounded-lg hover:bg-white/5"
            >
              What We Do
              <svg
                className="w-4 h-4 transition-transform duration-200"
                style={{
                  transform: mobileServicesOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
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
            {mobileServicesOpen && (
              <div className="pl-3 pt-1 pb-2 space-y-0.5 border-l-2 border-green-600/40 ml-3">
                {services.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(s.page);
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-green-400 transition-colors rounded-lg hover:bg-white/5"
                  >
                    {s.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    navigate("what-we-do");
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-green-400 font-semibold hover:text-green-300 transition-colors rounded-lg hover:bg-white/5 mt-1"
                >
                  View all services →
                </button>
              </div>
            )}
          </div>

          {/* Who We Help accordion */}
          <div>
            <button
              onClick={() => setMobileWhoOpen(!mobileWhoOpen)}
              className="flex items-center justify-between w-full px-3 py-2.5 text-white font-semibold hover:text-green-400 transition-colors rounded-lg hover:bg-white/5"
            >
              Who We Help
              <svg
                className="w-4 h-4 transition-transform duration-200"
                style={{
                  transform: mobileWhoOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
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
            {mobileWhoOpen && (
              <div className="pl-3 pt-1 pb-2 space-y-0.5 border-l-2 border-blue-600/40 ml-3">
                {whoWeHelp.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      navigate(s.page);
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm text-slate-400 hover:text-blue-300 transition-colors rounded-lg hover:bg-white/5"
                  >
                    {s.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    navigate("who-we-help");
                    setMobileOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-sm text-blue-400 font-semibold hover:text-blue-300 transition-colors rounded-lg hover:bg-white/5 mt-1"
                >
                  View all industries →
                </button>
              </div>
            )}
          </div>

          {/* Other links */}
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
              className="block w-full text-left px-3 py-2.5 text-white font-semibold hover:text-green-400 transition-colors rounded-lg hover:bg-white/5"
            >
              {label}
            </button>
          ))}

          {/* Mobile CTA */}
          <div className="pt-2">
            <button
              onClick={() => {
                navigate("contact");
                setMobileOpen(false);
              }}
              className="w-full bg-white text-[#16a34a] py-3 rounded-lg font-black hover:bg-green-50 transition-colors shadow-lg"
            >
              Get a Free Assessment
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
