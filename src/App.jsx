import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import WhatWeDo from "./pages/WhatWeDo";
import WhoWeHelp from "./pages/WhoWeHelp";
import Pricing from "./pages/Pricing";
import CaseStudies from "./pages/CaseStudies";
import AboutUs from "./pages/AboutUs";
import KnowledgeCentre from "./pages/KnowledgeCentre";
import Contact from "./pages/Contact";
import CookieBanner from "./components/CookieBanner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    const [basePage, hash] = page.split("#");
    setCurrentPage(basePage);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPage = () => {
    const basePage = currentPage.split("#")[0];

    switch (basePage) {
      case "home":
        return <Home navigate={navigate} />;
      case "what-we-do":
        return <WhatWeDo navigate={navigate} />;
      case "who-we-help":
        return <WhoWeHelp navigate={navigate} />;
      case "pricing":
        return <Pricing navigate={navigate} />;
      case "case-studies":
        return <CaseStudies navigate={navigate} />;
      case "about-us":
        return <AboutUs navigate={navigate} />;
      case "knowledge-centre":
        return <KnowledgeCentre navigate={navigate} />;
      case "contact":
        return <Contact navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="font-sans text-gray-800 bg-white">
      <TopBar navigate={navigate} />
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
      <CookieBanner />
    </div>
  );
}
