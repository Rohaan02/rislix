import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import {
  Building2,
  Landmark,
  GraduationCap,
  Settings,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Trophy,
  Award,
  Star,
  Users,
  Quote,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Briefcase,
  User,
  Shield,
  Lock,
  Target,
  TrendingUp,
  Sparkles,
  Rocket,
  Crown,
} from "lucide-react";

const casesData = [
  {
    icon: Building2,
    industry: "Insurance / Financial Services",
    company: "Leading Insurance Company (KSA)",
    challenge:
      "Required compliance with SAMA Cybersecurity Framework, NCA regulations, and PDPL while managing AI-driven transformation initiatives.",
    solution:
      "Conducted gap assessments across SAMA CSF, NCA ECC, and PDPL; implemented governance frameworks, controls, and DPIAs for AI-driven systems.",
    outcome:
      "Achieved 95%+ compliance across SAMA CSF, NCA ECC, and PDPL, strengthening AI governance and cybersecurity posture.",
    // name: "Confidential Client",
    role: "CISO",
  },
  {
    icon: Landmark,
    industry: "Government / Public Sector",
    company: "National Transport Authority (KSA)",
    challenge:
      "Needed alignment with national data protection regulations and governance requirements across multiple departments.",
    solution:
      "Implemented PDPL compliance framework, updated policies, and aligned governance with regulatory standards.",
    outcome:
      "Delivered 90%+ PDPL compliance; enhanced regulatory alignment and data governance maturity.",
    // name: "Confidential Client",
    role: "Head of IT / Compliance",
  },
  {
    icon: Settings,
    industry: "Technology / SaaS",
    company: "Blockchain & Web3 Software Company",
    challenge:
      "Lacked structured AI governance and required ISO 42001 implementation for compliance and trust.",
    solution:
      "Led ISO 42001 implementation, defined SOPs, mapped processes, and prepared the organization for audit readiness.",
    outcome:
      "Secured ISO/IEC 42001:2023 certification, positioning the organization as Pakistan’s first certified software house.",
    // name: "Confidential Client",
    role: "CEO",
  },
  {
    icon: GraduationCap,
    industry: "Financial Data / Credit Bureau",
    company: "Credit Bureau (KSA)",
    challenge:
      "Required strong data privacy controls and compliance with SDAIA PDPL and international privacy standards.",
    solution:
      "Implemented PDPL, NDMO requirements, and ISO privacy standards including ISO 29134, ISO 29151, and ISO 29190.",
    outcome:
      "Strengthened data protection framework and ensured secure handling of sensitive financial data.",
    // name: "Confidential Client",
    role: "Chief Data Officer",
  },
  {
    icon: Building2,
    industry: "Energy / Utilities",
    company: "Large Utility Provider",
    challenge:
      "Needed to protect large volumes of customer and employee data under strict regulatory requirements.",
    solution:
      "Aligned data protection policies with PDPL and enhanced internal security controls.",
    outcome:
      "Improved data security posture and achieved regulatory compliance.",
    // name: "Confidential Client",
    role: "IT Director",
  },
  {
    icon: Settings,
    industry: "Technology / AI",
    company: "AI Solutions Company",
    challenge:
      "No structured privacy management system to handle sensitive data and regulatory obligations.",
    solution:
      "Designed and implemented a full Privacy Information Management System (PIMS).",
    outcome:
      "Established scalable privacy controls and improved compliance efficiency.",
    // name: "Confidential Client",
    role: "CEO",
  },
];

const SectionHeaderWithIcon = ({ title, subtitle, icon: Icon }) => (
  <div className="text-center mb-12">
    {Icon && (
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-[#16a34a20] rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-[#16a34a]" />
        </div>
      </div>
    )}
    {subtitle && (
      <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
        {subtitle}
      </p>
    )}
    <h1 className="text-5xl font-black mb-6 text-[#0f172a]">{title}</h1>
  </div>
);

const StatusCard = ({ label, text, color, icon: Icon }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      {Icon && <Icon className={`w-4 h-4 ${color}`} />}
      <span className="font-bold text-[#0f172a] text-sm uppercase tracking-wide">
        {label}
      </span>
    </div>
    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
  </div>
);

export default function CaseStudies({ navigate }) {
  const getInitial = (name) => name.charAt(0);

  return (
    <div>
      <Helmet>
        <title>Case Studies | RISLIX</title>
        <meta
          name="description"
          content="Explore real-world case studies showcasing how RISLIX has helped organizations across various industries achieve cybersecurity compliance, mitigate risks, and enhance their security posture."
        />
      </Helmet>
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
            Success Stories
          </p>
          <h1 className="text-5xl font-black mb-6">Case Studies</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Real organizations, real results. See how RISLIX has helped clients
            achieve compliance and build cyber resilience.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          {casesData.map((caseStudy, index) => {
            const IconComponent = caseStudy.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="grid lg:grid-cols-4">
                  <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] p-8 flex flex-col justify-center items-center text-white text-center">
                    <IconComponent className="w-16 h-16 mb-3 text-[#16a34a]" />
                    <span className="text-[#16a34a] text-xs font-bold uppercase tracking-widest mb-1">
                      {caseStudy.industry}
                    </span>
                    <h3 className="text-lg font-black">{caseStudy.company}</h3>
                  </div>
                  <div className="lg:col-span-3 p-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <StatusCard
                        label="Challenge"
                        text={caseStudy.challenge}
                        color="text-red-500"
                        icon={AlertCircle}
                      />
                      <StatusCard
                        label="Solution"
                        text={caseStudy.solution}
                        color="text-yellow-500"
                        icon={Lightbulb}
                      />
                      <StatusCard
                        label="Outcome"
                        text={caseStudy.outcome}
                        color="text-green-500"
                        icon={Trophy}
                      />
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#16a34a] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        <AccountCircleIcon
                          style={{ fontSize: 24, color: "white" }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#0f172a] text-sm">
                          {caseStudy.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {caseStudy.role}, {caseStudy.company}
                        </p>
                      </div>
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
            Ready to Become Our Next Success Story?
          </h2>
          <p className="text-white/80 mb-8">
            Join organizations across the GCC, UK, and beyond who've built cyber
            confidence with RISLIX.
          </p>
          <Button
            onClick={() => navigate("contact")}
            className="bg-[#0f172a] text-white hover:bg-black rounded-full px-8 py-3 font-bold transition-colors"
          >
            Get a Free Assessment
          </Button>
        </div>
      </section>
    </div>
  );
}
