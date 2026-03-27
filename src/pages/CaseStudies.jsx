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
    industry: "Banking & Finance",
    company: "Gulf FinTech Group",
    challenge:
      "Required SAMA Cybersecurity Framework compliance and ISO 27001 certification to retain key banking partnerships.",
    solution:
      "RISLIX deployed a vCISO, conducted a full SAMA gap assessment, designed the governance framework, and led the ISO 27001 certification project end-to-end.",
    outcome:
      "SAMA audit passed with zero major findings. ISO 27001 certificate achieved in 14 weeks.",
    name: "Ahmed Al-Rashidi",
    role: "CTO",
  },
  {
    icon: Landmark,
    industry: "Government",
    company: "Regional Authority — GCC",
    challenge:
      "National mandate required NCA ECC compliance within 90 days across multiple departments.",
    solution:
      "Full NCA ECC gap analysis, policy library design, security awareness program, and audit evidence pack delivered under a managed advisory engagement.",
    outcome:
      "NCA ECC Level 2 compliance achieved. Regulator review passed with commendation.",
    name: "Mohammed Al-Qahtani",
    role: "CISO",
  },
  {
    icon: GraduationCap,
    industry: "Education",
    company: "UK University Group",
    challenge:
      "Handling personal data for 40,000+ students across three campuses required robust GDPR compliance and Cyber Essentials Plus certification.",
    solution:
      "vDPO service deployed, DPIA program implemented, ROPA documented, staff training delivered, and Cyber Essentials Plus certification achieved.",
    outcome:
      "Full GDPR compliance program in place. Cyber Essentials Plus achieved in 8 weeks.",
    name: "Sarah Mitchell",
    role: "Head of Compliance",
  },
  {
    icon: Settings,
    industry: "SaaS / Software",
    company: "CloudBuild Technologies",
    challenge:
      "Enterprise clients demanded SOC 2 Type II and ISO 27001 before signing — company had no formal security program.",
    solution:
      "RISLIX conducted a gap analysis, built the full policy and control library, implemented security architecture, and led the SOC 2 readiness program.",
    outcome:
      "SOC 2 Type II report issued. ISO 27001 certification in progress. Two enterprise contracts unblocked.",
    name: "James Cooper",
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
                        {getInitial(caseStudy.name)}
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
