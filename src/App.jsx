import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsBar from "./components/StatsBar";
import Services from "./components/Services";
import Technologies from "./components/Technologies";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Technologies />
        <Portfolio />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
