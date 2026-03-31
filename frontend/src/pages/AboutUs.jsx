import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import {
  Search,
  Trophy,
  Lightbulb,
  Users,
  Globe,
  Scale,
  Lock,
  Handshake,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import ECCouncilRislixCertified from "../../public/Certified/EC Council Certified - Rislix.png";
import IAPPRislixCertified from "../../public/Certified/IAPP Certified - Rislix.png";
import ISACARislixCertified from "../../public/Certified/ISACA Certified - Rislix.png";
import ISC2RislixCertified from "../../public/Certified/ISC2 Certified - Rislix.png";
import PECBRislixCertified from "../../public/Certified/PECB Certified - Rislix.jpeg";
import CSARislixCertified from "../../public/Certified/CSA Certified - Rislix.png";
import CQIIRCARislixCertified from "../../public/Certified/CQI IRCA Certified - Rislix.png";

const certificationsData = [
  {
    id: 1,
    name: "EC Council",
    image: ECCouncilRislixCertified,
    alt: "EC Council Certified Partner",
  },
  {
    id: 2,
    name: "IAPP",
    image: IAPPRislixCertified,
    alt: "IAPP Certified Partner",
  },
  {
    id: 3,
    name: "ISACA",
    image: ISACARislixCertified,
    alt: "ISACA Certified Partner",
  },
  {
    id: 4,
    name: "ISC2",
    image: ISC2RislixCertified,
    alt: "ISC2 Certified Partner",
  },
  {
    id: 5,
    name: "PECB",
    image: PECBRislixCertified,
    alt: "PECB Certified Partner",
  },
  {
    id: 6,
    name: "CSA",
    image: CSARislixCertified,
    alt: "CSA Certified Partner",
  },
  {
    id: 7,
    name: "CQI IRCA",
    image: CQIIRCARislixCertified,
    alt: "CQI & IRCA Certified Partner",
  },
];

const valuesData = [
  {
    icon: Search,
    title: "Transparency",
    desc: "We operate with an open-book policy. No hidden fees, no ambiguous language. We believe informed clients are the best clients.",
  },
  {
    icon: Trophy,
    title: "Excellence",
    desc: "We never compromise on quality. Every engagement is delivered with precision, expertise, and a commitment to operational excellence.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Cyber threats evolve every day, and so do we. Continual training, research, and development keep us ahead of the curve.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    desc: "Your security is our success. Our 24/7 availability ensures your business operations never have to pause because of a cybersecurity concern.",
  },
];

const statsData = [
  { number: "30+", label: "Cybersecurity Projects" },
  { number: "100%", label: "Service Guarantee" },
  { number: "10+", label: "Team Experts" },
];

const globalFeatures = [
  { icon: Globe, title: "Global Coverage" },
  { icon: Scale, title: "Regulatory Experts" },
  { icon: Lock, title: "ISO Certified" },
  { icon: Handshake, title: "Trusted Advisors" },
];

// Slider Component with Infinite Loop
const CertificationSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerView = 5;

  // Create extended array for infinite loop (duplicate items at start and end)
  const extendedData = [
    ...certificationsData.slice(-itemsPerView), // Last items at beginning
    ...certificationsData,
    ...certificationsData.slice(0, itemsPerView), // First items at end
  ];

  const totalItems = extendedData.length;
  const virtualIndex = currentIndex + itemsPerView; // Offset for the actual start

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Handle infinite loop transition
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      if (currentIndex >= certificationsData.length) {
        // Jump back to start without animation
        setIsTransitioning(false);
        setCurrentIndex(0);
      } else if (currentIndex < 0) {
        // Jump to end without animation
        setIsTransitioning(false);
        setCurrentIndex(certificationsData.length - 1);
      } else {
        setIsTransitioning(false);
      }
    }, 500); // Match transition duration

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Calculate translateX with proper offset
  const translateX = -(virtualIndex * (100 / itemsPerView));

  // Get current visible items for dots
  const getCurrentGroup = () => {
    let rawIndex = currentIndex % certificationsData.length;
    if (rawIndex < 0) rawIndex += certificationsData.length;
    return Math.floor(rawIndex / itemsPerView);
  };

  const totalGroups = Math.ceil(certificationsData.length / itemsPerView);

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="overflow-hidden">
        <div
          className={`flex gap-6 transition-transform duration-500 ease-in-out ${
            isTransitioning ? "transition-transform" : ""
          }`}
          style={{
            transform: `translateX(${translateX}%)`,
          }}
        >
          {extendedData.map((cert, idx) => (
            <div
              key={`${cert.id}-${idx}`}
              className="flex-shrink-0 group"
              style={{ width: `calc(${100 / itemsPerView}% - 1.5rem)` }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-[#16a34a40]">
                <div className="w-full h-32 flex items-center justify-center mb-4">
                  {cert.image ? (
                    <img
                      src={cert.image}
                      alt={cert.alt}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-sm">Coming Soon</span>
                    </div>
                  )}
                </div>
                <p className="text-center text-sm font-semibold text-gray-600 group-hover:text-[#16a34a] transition-colors">
                  {cert.name} Certified Partner
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-300 group focus:outline-none z-10"
        aria-label="Previous slide"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronLeft className="w-6 h-6 text-[#16a34a] group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-300 group focus:outline-none z-10"
        aria-label="Next slide"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronRight className="w-6 h-6 text-[#16a34a] group-hover:scale-110 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalGroups }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx * itemsPerView);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 5000);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              getCurrentGroup() === idx
                ? "w-8 bg-[#16a34a]"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function AboutUs({ navigate }) {
  return (
    <div>
      <Helmet>
        <title>About Us | RISLIX</title>
        <meta
          name="description"
          content="Learn about RISLIX, a leading cybersecurity consultancy. Our mission, values, and expert team dedicated to protecting your business from cyber threats."
        />
      </Helmet>
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
            Our Story
          </p>
          <h1 className="text-5xl font-black mb-6">About RISLIX</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Enterprise-grade cybersecurity, compliance, and governance — built
            for regulated organisations worldwide.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
              Who We Are
            </p>
            <h2 className="text-4xl font-black text-[#0f172a] mb-6">
              The Perfect Partner for{" "}
              <span className="text-[#16a34a]">Complete Cyber Protection</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              In a world where threats evolve every hour, RISLIX delivers
              enterprise-grade cybersecurity, compliance, and governance
              solutions designed to protect your business from every angle.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              We help organizations stay secure, compliant, resilient, and
              prepared — no matter how complex the challenge. From ISO 27001
              implementation to vCISO leadership, from GDPR programs to AI
              governance, RISLIX is your single trusted partner.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our team combines deep technical expertise with regulatory
              intelligence across the Middle East, Europe, the UK, and the
              United States.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {statsData.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center bg-[#f0fdf4] rounded-2xl p-4 border border-[#16a34a30]"
                >
                  <div className="text-2xl font-black text-[#16a34a]">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => navigate("contact")}
              className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full px-8 py-3 font-bold transition-colors"
            >
              Get in Touch
            </Button>
          </div>
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-3xl p-12 text-white text-center">
            <div className="w-28 h-28 mx-auto mb-6 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#16a34a25]"></div>
              <div className="absolute inset-3 rounded-full border-2 border-[#f5a62445]"></div>
              <div className="absolute inset-6 rounded-full border-2 border-[#16a34a65]"></div>
              <div className="absolute inset-9 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/Rislix Logo.png"
                  alt="RISLIX Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">
              <span className="text-[#1e3a8a]">RIS</span>
              <span className="text-[#16a34a]">LIX</span>
            </h3>
            <p className="text-[#16a34a] font-semibold mb-4 text-sm">
              Cyber · Privacy · GRC · AI
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Founded to make enterprise-grade cybersecurity and compliance
              accessible to every organization — regardless of size, sector, or
              geography.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {globalFeatures.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-[#ffffff0c] rounded-xl p-3 text-sm font-semibold border border-[#ffffff10]"
                  >
                    <div className="flex justify-center mb-1">
                      <IconComponent className="w-6 h-6 text-[#16a34a]" />
                    </div>
                    {feature.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Our Core Values" subtitle="What Drives Us" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesData.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-[#16a34a40] transition-all group"
                >
                  <div className="w-14 h-14 bg-[#f0fdf4] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#16a34a] transition-colors">
                    <IconComponent className="w-7 h-7 text-[#16a34a] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-xl text-[#0f172a] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Certifications & Partnerships"
            subtitle="Our Credentials"
          />
          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
            We are proud to be certified and recognized by the world's leading
            cybersecurity organizations.
          </p>
          <CertificationSlider />
        </div>
      </section>

      <section className="py-16 bg-[#0f172a] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">
            Ready to Work With Industry Experts?
          </h2>
          <p className="text-gray-400 mb-8">
            Join the organizations that trust RISLIX for their cybersecurity and
            compliance needs.
          </p>
          <Button
            onClick={() => navigate("contact")}
            className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full px-8 py-3 font-bold transition-colors"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
