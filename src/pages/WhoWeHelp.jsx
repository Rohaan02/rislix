import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Button from "../components/Button";
import {
  Landmark,
  Building2,
  GraduationCap,
  Wifi,
  Monitor,
  Settings,
  CheckCircle,
  ArrowRight,
  Shield,
  Lock,
  Database,
  Cloud,
  FileCheck,
  Award,
  Briefcase,
  Globe,
  Users,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

const industriesData = [
  {
    id: "government",
    icon: Landmark,
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
    icon: Building2,
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
    icon: GraduationCap,
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
    icon: Wifi,
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
    icon: Monitor,
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
    icon: Settings,
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
    const hash = window.location.hash;
    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const navbar = document.querySelector("nav");
          const navbarHeight = navbar ? navbar.offsetHeight : 80;
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navbarHeight - 10;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 200);
      }
    }
  }, []);

  const CheckIcon = () => (
    <CheckCircle className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
  );

  return (
    <div>
      <Helmet>
        <title>Who We Help | RISLIX</title>
        <meta
          name="description"
          content="Cybersecurity and compliance solutions for Government, Banking, Education, Telecom, and IT sectors."
        />
      </Helmet>
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
          {industriesData.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <div
                key={index}
                id={industry.id}
                className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-[100px]`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <IconComponent className="w-12 h-12 text-[#16a34a]" />
                    <h2 className="text-3xl font-black text-[#0f172a]">
                      {industry.title}
                    </h2>
                  </div>
                  <div className="bg-gray-50 border-l-4 border-[#16a34a] rounded-r-xl p-4 mb-6 italic text-gray-600">
                    "{industry.concern}"
                  </div>
                  <div className="space-y-2 mb-6">
                    {industry.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <CheckIcon />
                        {point}
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
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-3xl p-10 text-white">
                    <h3 className="font-bold text-lg mb-4 text-[#16a34a]">
                      Relevant Frameworks
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {industry.frameworks.map((framework) => (
                        <div
                          key={framework}
                          className="bg-[#ffffff12] rounded-xl px-4 py-3 text-sm font-semibold text-center border border-[#ffffff10]"
                        >
                          {framework}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-[#ffffff15]">
                      <p className="text-gray-400 text-sm">
                        Need a custom solution for your industry?
                      </p>
                      <button
                        onClick={() => navigate("contact")}
                        className="text-[#16a34a] font-semibold text-sm hover:underline mt-1 flex items-center gap-1"
                      >
                        Talk to our experts <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
