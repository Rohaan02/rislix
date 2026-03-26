import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import RislixLogo from "../components/RislixLogo";
import {
  Search,
  Trophy,
  Lightbulb,
  Users,
  Globe,
  Scale,
  Lock,
  Handshake,
  User,
  Award,
  Star,
  Shield,
  Target,
  TrendingUp,
  Sparkles,
  Rocket,
  Crown,
  CheckCircle,
  Briefcase,
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  ThumbsUp,
  Quote,
  ArrowRight,
} from "lucide-react";

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

const teamData = [
  {
    name: "Vincent Picton",
    role: "Founder & CEO",
    icon: User,
    bio: "20+ years in cybersecurity, governance, and compliance across regulated industries globally.",
  },
  {
    name: "James Harrison",
    role: "Head of VAPT",
    icon: Shield,
    bio: "CREST certified penetration tester with expertise in web, API, and cloud security.",
  },
  {
    name: "Priya Sharma",
    role: "GRC & Privacy Lead",
    icon: Scale,
    bio: "Qualified DPO and IASME certified assessor specialising in ISO 27001 and GDPR.",
  },
  {
    name: "Tom Bradley",
    role: "vCISO Practice Lead",
    icon: Target,
    bio: "Former CISO with 15+ years advising boards and regulators across finance and government.",
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

const certifications = [
  "ISO 27001:2022",
  "ISO 42001",
  "NIST CSF",
  "SAMA Framework",
  "NCA ECC",
  "GDPR",
  "SOC 2",
  "PCI DSS",
  "CMMC",
  "FedRAMP",
  "HIPAA",
  "Cyber Essentials",
];

export default function AboutUs({ navigate }) {
  return (
    <div>
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
              <span className="text-[#1e3a8a]">RISL</span>
              <span className="text-[#16a34a]">IX</span>
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
          <SectionHeader title="Meet the Team" subtitle="Our Experts" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member, index) => {
              const IconComponent = member.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100 group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className="w-10 h-10 text-[#16a34a]" />
                  </div>
                  <h3 className="font-bold text-[#0f172a]">{member.name}</h3>
                  <p className="text-[#16a34a] text-sm font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f172a] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">
            Certifications & Standards Expertise
          </h2>
          <p className="text-gray-400 mb-8">
            Our team holds and works with the highest accreditations and
            standards in the industry.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="bg-[#ffffff10] border border-[#ffffff15] text-gray-300 px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#16a34a20] hover:border-[#16a34a] transition-all"
              >
                {cert}
              </span>
            ))}
          </div>
          <Button
            onClick={() => navigate("contact")}
            className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full px-8 py-3 font-bold transition-colors"
          >
            Work With Us
          </Button>
        </div>
      </section>
    </div>
  );
}
