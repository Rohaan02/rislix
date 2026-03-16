import { useEffect } from "react";
import Button from "../components/Button";

const industries = [
  {
    id: "government",
    icon: "🏛️",
    title: "Government",
    concern:
      "We need to meet national cybersecurity mandates but lack internal security expertise.",
    points: [
      "NCA ECC / NIA / UAE ISR compliance",
      "FedRAMP for cloud systems",
      "Policy and governance framework design",
      "VAPT for critical infrastructure",
    ],
    frameworks: ["NCA ECC", "NIA Framework", "ISO 27001", "FedRAMP"],
  },
  {
    id: "banking",
    icon: "🏦",
    title: "Banking & Finance",
    concern:
      "Our regulators expect SAMA or QCB compliance and our audit is next quarter.",
    points: [
      "SAMA Cybersecurity Framework implementation",
      "QCB / DFSA regulatory alignment",
      "PCI DSS and SOC 2 readiness",
      "Risk and audit evidence management",
    ],
    frameworks: ["SAMA", "QCB", "PCI DSS", "SOC 2"],
  },
  {
    id: "education",
    icon: "🎓",
    title: "Education",
    concern:
      "We handle sensitive student data and need GDPR and FERPA compliance without a large IT team.",
    points: [
      "GDPR & FERPA data protection programs",
      "DPIA and student data governance",
      "Phishing simulations for staff & students",
      "ISO 27001 roadmap for institutions",
    ],
    frameworks: ["GDPR", "FERPA", "ISO 27001", "Cyber Essentials"],
  },
  {
    id: "telecom",
    icon: "📡",
    title: "Telecom",
    concern:
      "We're a licensed operator and need to comply with national cybersecurity and data protection laws.",
    points: [
      "CITC Cloud Compliance (KSA)",
      "Network penetration testing",
      "Incident response planning",
      "Data protection program for subscriber data",
    ],
    frameworks: ["CITC", "NCA ECC", "ISO 27001", "PDPL"],
  },
  {
    id: "information-technology",
    icon: "💻",
    title: "Information Technology",
    concern:
      "Our clients demand ISO 27001 certification and we need to move fast without disrupting delivery.",
    points: [
      "ISO 27001:2022 gap analysis & certification",
      "SOC 2 Type II readiness",
      "Vendor security assessment programs",
      "Security architecture for cloud-native environments",
    ],
    frameworks: ["ISO 27001", "SOC 2", "NIST CSF", "Cyber Essentials"],
  },
  {
    id: "software-it",
    icon: "⚙️",
    title: "Software & IT",
    concern:
      "We build SaaS products and need to bake security and compliance into our development lifecycle.",
    points: [
      "Secure SDLC & DevSecOps advisory",
      "Web application & API penetration testing",
      "GDPR / CCPA privacy by design",
      "AI governance for ML-enabled products",
    ],
    frameworks: ["ISO 27001", "GDPR", "CCPA", "ISO 42001"],
  },
];

export default function WhoWeHelp({ navigate }) {
  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash;
    if (hash) {
      // Remove the # character
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Small delay to ensure rendering is complete
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  return (
    <div>
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
            Industries We Serve
          </p>
          <h1 className="text-5xl font-black mb-6">Who We Help</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Delivering cyber confidence across multiple industries. Tailored
            solutions for every regulated environment.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {industries.map((ind, i) => (
            <div
              key={i}
              id={ind.id}
              className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-[100px]`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{ind.icon}</span>
                  <h2 className="text-3xl font-black text-[#0f172a]">
                    {ind.title}
                  </h2>
                </div>
                <div className="bg-gray-50 border-l-4 border-[#16a34a] rounded-r-xl p-4 mb-6 italic text-gray-600">
                  "{ind.concern}"
                </div>
                <div className="space-y-2 mb-6">
                  {ind.points.map((pt) => (
                    <div
                      key={pt}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <svg
                        className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {pt}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => navigate("contact")}
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full px-6 py-3 font-bold transition-colors"
                >
                  Get a Free Assessment
                </Button>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-3xl p-10 text-white">
                  <h3 className="font-bold text-lg mb-4 text-[#16a34a]">
                    Relevant Frameworks
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {ind.frameworks.map((f) => (
                      <div
                        key={f}
                        className="bg-[#ffffff12] rounded-xl px-4 py-3 text-sm font-semibold text-center border border-[#ffffff10]"
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#ffffff15]">
                    <p className="text-gray-400 text-sm">
                      Need a custom solution for your industry?
                    </p>
                    <button
                      onClick={() => navigate("contact")}
                      className="text-[#16a34a] font-semibold text-sm hover:underline mt-1 block"
                    >
                      Talk to our experts →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#1e3a8a] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">
            Your Industry Not Listed?
          </h2>
          <p className="text-white/80 mb-8">
            We've served clients across healthcare, legal, energy, e-commerce,
            and more. Get in touch and we'll tailor a solution for your specific
            regulatory environment.
          </p>
          <Button
            onClick={() => navigate("contact")}
            className="bg-[#0f172a] text-white hover:bg-black rounded-full px-8 py-3 font-bold transition-colors"
          >
            Tell Us Your Needs
          </Button>
        </div>
      </section>
    </div>
  );
}
