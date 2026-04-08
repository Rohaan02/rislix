import { Helmet } from "react-helmet-async";
import SectionHeader from "../components/SectionHeader";
import Button from "../components/Button";
import ContactForm from "../components/ContactForm";
import { useEffect } from "react";
import {
  Shield,
  Lock,
  ClipboardList,
  Target,
  Building2,
  Repeat,
  Brain,
  Headset,
  CheckCircle,
  ChevronRight,
  Award,
  FileText,
  Users,
  Globe,
  Database,
  Cloud,
  Network,
  LockKeyhole,
  Fingerprint,
  Gavel,
  RefreshCw,
  Sparkles,
  Zap,
  Rocket,
  ShieldCheck,
  BarChart,
  Settings,
  Activity,
  AlertTriangle,
  Eye,
  Key,
  UserCheck,
  Server,
  Wifi,
  Smartphone,
  CloudCog,
  ShieldAlert,
  Bug,
  Scan,
  LockIcon,
  Home,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  MessageSquare,
  HelpCircle,
  Info,
  Book,
  FileText as FileTextIcon,
  Video,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Minimize2,
  XCircle,
  CheckSquare,
  Square,
  Radio,
  Download,
  Upload,
  Trash2,
  Edit,
  Save,
  Copy,
  Share2,
  Heart,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const servicesData = [
  {
    id: "vciso",
    icon: Shield,
    title: "vCISO – Virtual Chief Information Security Officer",
    desc: "RISLIX provides executive-level cybersecurity leadership to organizations that require strategic direction without the cost and overhead of a full-time CISO.",
    delivers: [
      "Enterprise-wide security governance aligned with business objectives",
      "Cybersecurity strategy, roadmap, and target operating model",
      "Risk management framework design & implementation",
      "Oversight of MSP/MSSP, SOC/NOC, cloud, and infrastructure",
      "Board & executive reporting",
      "Audit preparation and liaison with regulators, certification bodies, and clients",
      "Security KPIs, dashboards, and governance committees",
    ],
    standards:
      "ISO 27001, NIST CSF, SOC 2, SAMA, NCA ECC/CCC, CMMC, Cyber Essentials, FedRAMP, HIPAA, PCI DSS",
  },
  {
    id: "vdpo",
    icon: Lock,
    title: "vDPO – Virtual Data Protection Officer",
    desc: "RISLIX provides expert data privacy leadership tailored to global and regional privacy laws.",
    delivers: [
      "Data Privacy Program design",
      "Data Protection Impact Assessments (DPIA/PIA)",
      "AI Data Protection & Responsible AI governance",
      "Record of Processing Activities (ROPA)",
      "Consent, retention, and data minimization frameworks",
      "Vendor/Data Processor risk assessments",
      "Data breach response guidance",
    ],
    regions: [
      { label: "Middle East", items: ["Qatar PDPPL", "KSA PDPL", "UAE PDPL"] },
      {
        label: "Europe",
        items: ["GDPR", "e-Privacy", "Schrems II compliance"],
      },
      {
        label: "US & Global",
        items: [
          "California Consumer Privacy Act (CCPA/CPRA)",
          "HIPAA Privacy Rules",
          "FERPA",
        ],
      },
    ],
  },
  {
    id: "grc",
    icon: ClipboardList,
    title: "Governance, Risk & Compliance (GRC)",
    desc: "A premium service offering tailored governance frameworks, controls, policies, and regulatory alignment.",
    sub: [
      {
        title: "3A. Global Standards Implementation",
        intro:
          "We design, implement, and mature management systems aligned with:",
        items: [
          "ISO 27001:2022 – Information Security",
          "ISO 22301 – Business Continuity",
          "ISO 42001 – AI Management Systems",
          "ISO 27035 – Incident Response",
          "ISO 27701 – Privacy Information Management",
          "NIST CSF & NIST SP Series",
          "COBIT",
          "SOC 2 Trust Services Criteria",
          "Cyber Essentials (UK)",
          "FedRAMP (US Public Sector Cloud)",
          "CMMC (US DoD)",
        ],
      },
      {
        title: "3B. Country-Specific Compliance Programs",
        regions: [
          {
            label: "Saudi Arabia (KSA)",
            items: [
              "SAMA Cybersecurity Framework",
              "NCA ECC, CCC, DCC",
              "CITC Cloud Compliance",
              "SDAIA AI Ethics & Data Protection",
            ],
          },
          {
            label: "Qatar",
            items: [
              "QCB Cybersecurity Requirements",
              "NIA Framework",
              "Qatar PDPPL",
            ],
          },
          {
            label: "UAE",
            items: [
              "UAE ISR v2",
              "DFSA & ADGM Regulations",
              "UAE Federal PDPL",
            ],
          },
          {
            label: "United Kingdom",
            items: ["UK GDPR", "Cyber Essentials / Cyber Essentials Plus"],
          },
          {
            label: "United States",
            items: [
              "FedRAMP (Moderate / High baseline)",
              "NIST CSF & RMF",
              "CMMC L1/L2",
              "HIPAA Security Rules",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "vapt",
    icon: Target,
    title: "Cybersecurity Assessments & VAPT",
    desc: "A comprehensive service for identifying, validating, and mitigating vulnerabilities across digital ecosystems.",
    portfolio: [
      "Network Penetration Testing (Internal/External)",
      "Web Application & API Penetration Testing",
      "Mobile Application Security Testing",
      "Cloud Security Assessments (Azure, AWS, GCP)",
      "Wireless Security Testing",
      "Social Engineering & Phishing Campaigns",
      "Red Team/Blue Team exercises",
      "Configuration Reviews (OS, Databases, Firewalls, AD)",
    ],
    deliverables: [
      "Executive summary for leadership",
      "Technical findings with CVSS scoring",
      "Threat–Risk–Vulnerability mapping",
      "Remediation roadmap & security hardening guidance",
    ],
  },
  {
    id: "architecture",
    icon: Building2,
    title: "Enterprise Security Architecture & Hardening",
    desc: "End-to-end design and enhancement of secure digital environments.",
    delivers: [
      "Zero Trust Architecture",
      "Secure Network Architecture",
      "Identity & Access Management (IAM)",
      "Active Directory Hardening",
      "Cloud & Hybrid Security Architecture",
      "Endpoint/EDR/XDR governance",
      "OT/ICS security governance",
    ],
  },
  {
    id: "business-continuity",
    icon: Repeat,
    title: "Business Continuity, Disaster Recovery & ISO 22301",
    desc: "Ensuring organizations remain resilient against disruption.",
    delivers: [
      "BIA & BRA development",
      "RTO/RPO/MAO mapping",
      "Full & partial interruption DR exercises",
      "DR runbooks, activation scripts, and decision trees",
      "Crisis management planning & communication strategies",
    ],
  },
  {
    id: "ai-governance",
    icon: Brain,
    title: "AI Governance & Responsible AI Compliance",
    desc: "Aligning modern AI systems with global ethical, safety, and regulatory standards.",
    delivers: [
      "AI risk assessments & AI security posture reviews",
      "AI lifecycle governance & documentation",
      "AI model transparency, safety, and robustness controls",
      "Alignment with ISO 42001, NIST AI RMF, EU AI Act, and national AI guidelines",
    ],
  },
  {
    id: "managed-advisory",
    icon: Headset,
    title: "Managed Cybersecurity Advisory (Continuous Support)",
    desc: "A tailored subscription model providing ongoing advisory services.",
    delivers: [
      "Monthly governance reviews",
      "Continuous compliance monitoring",
      "Risk register updates",
      "Audit preparation & evidence collection",
      "Policy lifecycle management",
    ],
  },
];

export default function WhatWeDo({ navigate }) {
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
    <CheckCircle className="w-4 h-4 text-[#16a34a] shrink-0 mt-0.5" />
  );

  return (
    <div>
      <Helmet>
        <title>What We Do | RISLIX</title>
        <meta
          name="description"
          content="Comprehensive cybersecurity, privacy, GRC, and AI governance services including vCISO, vDPO, VAPT, and ISO 27001 implementation."
        />
      </Helmet>
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
            Our Services
          </p>
          <h1 className="text-5xl font-black mb-6">What We Do</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Comprehensive cybersecurity, privacy, GRC, and AI governance
            services for regulated organisations worldwide.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 space-y-10">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                id={service.id}
                className={`bg-white rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/3 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] p-10 flex flex-col justify-center items-center text-white text-center">
                  <IconComponent className="w-16 h-16 mb-4 text-[#16a34a]" />
                  <h2 className="text-xl font-black leading-snug">
                    {service.title}
                  </h2>
                </div>
                <div className="lg:w-2/3 p-10">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {service.delivers && (
                    <div className="mb-6">
                      <p className="font-bold text-[#0f172a] mb-3 text-sm uppercase tracking-wide">
                        What We Deliver
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.delivers.map((deliver) => (
                          <div
                            key={deliver}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckIcon />
                            {deliver}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.standards && (
                    <div className="bg-[#f0fdf4] border border-[#16a34a30] rounded-xl px-5 py-3 mb-4">
                      <p className="text-xs font-bold text-[#16a34a] uppercase tracking-wide mb-1">
                        Standards & Frameworks Covered
                      </p>
                      <p className="text-sm text-gray-600">
                        {service.standards}
                      </p>
                    </div>
                  )}

                  {service.regions && (
                    <div className="mb-6">
                      <p className="font-bold text-[#0f172a] mb-3 text-sm uppercase tracking-wide">
                        Regulations Covered (Region-Wise)
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {service.regions.map((region) => (
                          <div
                            key={region.label}
                            className="bg-gray-50 rounded-xl p-4"
                          >
                            <p className="font-bold text-[#16a34a] text-xs mb-2">
                              {region.label}
                            </p>
                            {region.items.map((item) => (
                              <p
                                key={item}
                                className="text-xs text-gray-600 mb-1"
                              >
                                • {item}
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.sub &&
                    service.sub.map((subSection, idx) => (
                      <div key={idx} className="mb-6">
                        <p className="font-bold text-[#0f172a] mb-2">
                          {subSection.title}
                        </p>
                        {subSection.intro && (
                          <p className="text-sm text-gray-500 mb-2">
                            {subSection.intro}
                          </p>
                        )}
                        {subSection.items && (
                          <div className="grid grid-cols-2 gap-1 mb-2">
                            {subSection.items.map((item) => (
                              <p key={item} className="text-xs text-gray-600">
                                • {item}
                              </p>
                            ))}
                          </div>
                        )}
                        {subSection.regions && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {subSection.regions.map((region) => (
                              <div
                                key={region.label}
                                className="bg-gray-50 rounded-xl p-3"
                              >
                                <p className="font-bold text-[#16a34a] text-xs mb-1">
                                  {region.label}
                                </p>
                                {region.items.map((item) => (
                                  <p
                                    key={item}
                                    className="text-xs text-gray-500"
                                  >
                                    • {item}
                                  </p>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                  {service.portfolio && (
                    <div className="mb-4">
                      <p className="font-bold text-[#0f172a] mb-3 text-sm uppercase tracking-wide">
                        Assessment Portfolio
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {service.portfolio.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckIcon />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.deliverables && (
                    <div className="bg-[#f0fdf4] border border-[#16a34a30] rounded-xl p-4">
                      <p className="font-bold text-[#16a34a] text-xs mb-2 uppercase tracking-wide">
                        Deliverables
                      </p>
                      {service.deliverables.map((item) => (
                        <p key={item} className="text-xs text-gray-600 mb-1">
                          • {item}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="mt-6">
                    <Button
                      onClick={() => navigate("contact")}
                      className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full px-6 py-2.5 font-bold transition-colors"
                    >
                      Get a Free Assessment
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 bg-[#0f172a] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader title="Get in Touch" subtitle="Contact Us" light />
          <div className="bg-[#ffffff08] border border-[#ffffff15] rounded-2xl p-10">
            <ContactForm dark />
          </div>
        </div>
      </section>
    </div>
  );
}
