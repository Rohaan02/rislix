import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import CustomCursor from "./components/CustomCursor";
import Home from "./pages/Home";
import WhatWeDo from "./pages/WhatWeDo";
import WhoWeHelp from "./pages/WhoWeHelp";
import Pricing from "./pages/Pricing";
import CaseStudies from "./pages/CaseStudies";
import AboutUs from "./pages/AboutUs";
import KnowledgeCentre from "./pages/KnowledgeCentre";
import Contact from "./pages/Contact";
import CookieBanner from "./components/CookieBanner";

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pageNames = {
      "/": "Home",
      "/what-we-do": "What We Do",
      "/who-we-help": "Who We Help",
      "/pricing": "Pricing",
      "/case-studies": "Case Studies",
      "/about-us": "About Us",
      "/knowledge-centre": "Knowledge Centre",
      "/contact": "Contact",
    };

    const pageName = pageNames[location.pathname] || "Home";
    document.title = `${pageName} | RISLIX - Cybersecurity & Compliance`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const descriptions = {
        "/": "Enterprise-grade cybersecurity, compliance, and governance solutions for regulated organisations worldwide.",
        "/what-we-do":
          "Comprehensive cybersecurity, privacy, GRC, and AI governance services including vCISO, vDPO, VAPT, and ISO 27001 implementation.",
        "/who-we-help":
          "Cybersecurity and compliance solutions for Government, Banking, Education, Telecom, and IT sectors.",
        "/pricing":
          "Transparent pricing for our cybersecurity and compliance services. Get a tailored quote for your organization.",
        "/case-studies":
          "Real success stories from organizations who built cyber confidence with RISLIX.",
        "/about-us":
          "Learn about RISLIX - your partner for complete cyber protection with enterprise-grade expertise.",
        "/knowledge-centre":
          "Expert guides, articles, and insights on cybersecurity, compliance, and governance.",
        "/contact":
          "Get in touch with our cybersecurity experts for a free initial consultation.",
      };
      metaDescription.content =
        descriptions[location.pathname] || descriptions["/"];
    }
  }, [location]);

  const navigateTo = (page) => {
    const [basePage, hash] = page.split("#");
    const path = basePage === "home" ? "/" : `/${basePage}`;

    if (hash) {
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const navbar = document.querySelector("nav");
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight - 10;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      <CustomCursor />
      <TopBar navigate={navigateTo} />
      <Navbar currentPage={location.pathname} navigate={navigateTo} />
      <main>
        <Routes>
          <Route path="/" element={<Home navigate={navigateTo} />} />
          <Route
            path="/what-we-do"
            element={<WhatWeDo navigate={navigateTo} />}
          />
          <Route
            path="/who-we-help"
            element={<WhoWeHelp navigate={navigateTo} />}
          />
          <Route path="/pricing" element={<Pricing navigate={navigateTo} />} />
          <Route
            path="/case-studies"
            element={<CaseStudies navigate={navigateTo} />}
          />
          <Route path="/about-us" element={<AboutUs navigate={navigateTo} />} />
          <Route
            path="/knowledge-centre"
            element={<KnowledgeCentre navigate={navigateTo} />}
          />
          <Route path="/contact" element={<Contact navigate={navigateTo} />} />
        </Routes>
      </main>
      <Footer navigate={navigateTo} />
      <CookieBanner />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
