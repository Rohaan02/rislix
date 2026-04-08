import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import StatCard from "../components/StatCard";
import ProcessStep from "../components/ProcessStep";
import ContactForm from "../components/ContactForm";
import HeroBg from "../components/HeroBg";
import {
  Shield,
  Lock,
  ClipboardList,
  Target,
  Building2,
  Repeat,
  Brain,
  Headset,
  Landmark,
  GraduationCap,
  Wifi,
  Monitor,
  Code2,
  Flag,
  CheckCircle,
  Scale,
  RefreshCw,
  Headphones,
  Gavel,
  Award,
  Lightbulb,
  Mail,
  ChevronDown,
  ArrowRight,
  LockKeyhole,
} from "lucide-react";
import TestimonialCard from "../components/TestimonialCard";

const servicesData = [
  {
    icon: Shield,
    title: "vCISO",
    sub: "Virtual Chief Information Security Officer",
    desc: "Executive-level cybersecurity leadership without the cost of a full-time CISO.",
  },
  {
    icon: Lock,
    title: "vDPO",
    sub: "Virtual Data Protection Officer",
    desc: "Expert data privacy leadership tailored to global and regional privacy laws.",
  },
  {
    icon: ClipboardList,
    title: "GRC",
    sub: "Governance, Risk & Compliance",
    desc: "Premium tailored governance frameworks, controls, policies, and regulatory alignment.",
  },
  {
    icon: Target,
    title: "VAPT",
    sub: "Cybersecurity Assessments & VAPT",
    desc: "Identifying, validating, and mitigating vulnerabilities across digital ecosystems.",
  },
  {
    icon: Building2,
    title: "Security Architecture",
    sub: "Enterprise Security Architecture & Hardening",
    desc: "End-to-end design and enhancement of secure digital environments.",
  },
  {
    icon: Repeat,
    title: "BCM / DR",
    sub: "Business Continuity & ISO 22301",
    desc: "Ensuring organizations remain resilient against disruption with BIA, DR, and crisis plans.",
  },
  {
    icon: Brain,
    title: "AI Governance",
    sub: "Responsible AI Compliance",
    desc: "Aligning AI systems with global ethical, safety, and regulatory standards.",
  },
  {
    icon: Headset,
    title: "Managed Advisory",
    sub: "Continuous Cybersecurity Advisory",
    desc: "Ongoing subscription-based advisory — compliance monitoring, audits, risk registers.",
  },
];

const industriesData = [
  { icon: Landmark, name: "Government", page: "who-we-help#government" },
  { icon: Building2, name: "Banking & Finance", page: "who-we-help#banking" },
  { icon: GraduationCap, name: "Education", page: "who-we-help#education" },
  { icon: Wifi, name: "Telecom", page: "who-we-help#telecom" },
  {
    icon: Monitor,
    name: "Information Technology",
    page: "who-we-help#information-technology",
  },
  { icon: Code2, name: "Software & IT", page: "who-we-help#software-it" },
];

const faqsData = [
  {
    q: "What is a vCISO and does my organization need one?",
    a: "A vCISO (Virtual CISO) provides executive-level cybersecurity leadership without the overhead of a full-time hire. If your organization needs strategic direction, compliance oversight, board reporting, or risk governance — a vCISO is the right fit.",
  },
  {
    q: "Which compliance frameworks does RISLIX cover?",
    a: "We cover ISO 27001, NIST CSF, SOC 2, SAMA, NCA ECC/CCC, CMMC, Cyber Essentials, FedRAMP, HIPAA, PCI DSS, GDPR, Qatar PDPPL, KSA PDPL, UAE PDPL, and many more.",
  },
  {
    q: "Do you serve organizations outside the Middle East?",
    a: "Yes. RISLIX serves clients globally including the UK, US, EU, and GCC regions. Our compliance expertise spans regional frameworks across all major jurisdictions.",
  },
  {
    q: "What is included in a VAPT engagement?",
    a: "Our VAPT includes network penetration testing, web/API testing, mobile app security, cloud assessments (Azure/AWS/GCP), social engineering, red team exercises, and a full technical report with CVSS scoring and remediation guidance.",
  },
  {
    q: "How quickly can we get started?",
    a: "We offer a free 30-minute initial consultation. Following scoping, most engagements begin within 1–2 weeks. Contact info@rislix.com to get started.",
  },
  {
    q: "Does RISLIX help with AI governance?",
    a: "Yes. We provide AI risk assessments, AI lifecycle governance, model transparency reviews, and alignment with ISO 42001, NIST AI RMF, and the EU AI Act.",
  },
];

const newsData = [
  {
    title: "Understanding the NCA ECC Framework for Saudi Organizations",
    tag: "Guide",
    date: "Feb 2026",
    icon: Flag,
  },
  {
    title: "ISO 42001: What the AI Management Standard Means for Your Business",
    tag: "Article",
    date: "Jan 2026",
    icon: Brain,
  },
  {
    title: "DORA Compliance: What Financial Firms Need to Know",
    tag: "News",
    date: "Dec 2025",
    icon: Building2,
  },
  {
    title: "vCISO vs Full-Time CISO: Which Is Right for Your Organization?",
    tag: "Guide",
    date: "Nov 2025",
    icon: Shield,
  },
];

export default function Home({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <Helmet>
        <title>Home | RISLIX</title>
        <meta
          name="description"
          content="Enterprise-grade cybersecurity, compliance, and governance solutions for regulated organisations worldwide."
        />
      </Helmet>
      {/* ── Hero ── */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden min-h-[88vh] flex items-center">
        <HeroBg />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#1e3a8a08] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#16a34a05] rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #16a34a 1px, transparent 0)",
              backgroundSize: "44px 44px",
            }}
          ></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl lg:text-[3.2rem] font-black leading-tight mb-6 tracking-tight">
              Compliance That Inspires
              <span className="text-[#16a34a]"> Confidence,</span> Security That
              Enables <span className="text-[#16a34a]">Growth.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-xl">
              Our comprehensive Information Security Consultancy services help
              organizations build trust, reduce uncertainty, and stay
              audit-ready year-round.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("contact")}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full"
              >
                Get a Free Assessment
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("what-we-do")}
                className="border-white text-white hover:bg-white hover:!text-[#0f172a] rounded-full"
              >
                Explore Services
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-96 h-96">
              <div
                className="absolute inset-0 rounded-full border border-[#16a34a20] animate-ping"
                style={{ animationDuration: "3s" }}
              ></div>
              <div className="absolute inset-6 rounded-full border border-[#16a34a30]"></div>
              <div className="absolute inset-12 rounded-full border border-[#16a34a45]"></div>
              <div className="absolute inset-20 rounded-full border border-[#16a34a60]"></div>
              <div className="absolute inset-28 rounded-full bg-[#16a34a18] border border-[#16a34a80] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#16a34a] font-black text-2xl tracking-widest">
                    RISLIX
                  </div>
                  <div className="text-gray-400 text-xs tracking-wider mt-1">
                    Information Security Consultancy
                  </div>
                </div>
              </div>
              {[
                {
                  label: "Data Protection",
                  pos: "bottom-20 -right-2",
                  icon: Shield,
                },
                {
                  label: "Information Security",
                  pos: "top-10 -left-4",
                  icon: Lock,
                },
                {
                  label: "Data Privacy",
                  pos: "bottom-32 left-0",
                  icon: LockKeyhole,
                },
                {
                  label: "AI Security",
                  pos: "top-24 -right-4",
                  icon: Brain,
                },
                {
                  label: "AI Governance",
                  pos: "bottom-5 left-20",
                  icon: Scale,
                },
              ].map((b) => {
                const IconComponent = b.icon;
                return (
                  <div
                    key={b.label}
                    className={`absolute ${b.pos} bg-[#0f172a] border border-[#16a34a40] text-white px-3 py-1.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap`}
                  >
                    <IconComponent className="w-4 h-4 text-[#16a34a]" />
                    {b.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries Banner ── */}
      <section className="bg-[#0F172A] py-10 border-y-4">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-white font-bold text-sm uppercase tracking-widest mb-8 relative">
            <span className="relative inline-block px-6 py-2 bg-white/10 rounded-full">
              Delivering Cyber Confidence Across Multiple Industries
            </span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-px bg-white/20 border border-white/20 rounded-2xl overflow-hidden">
            {industriesData.map((ind) => {
              const IconComponent = ind.icon;
              return (
                <div
                  key={ind.name}
                  onClick={() => navigate(ind.page)}
                  className="flex items-center gap-3 bg-[#0F172A] p-4 text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <IconComponent className="w-8 h-8 text-[#16a34a]" />
                  <div>
                    <span className="font-semibold text-sm">{ind.name}</span>
                    <span className="block text-xs text-white/60 mt-1">
                      Cyber Protected
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Our Services" subtitle="What We Deliver" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {servicesData.map((service, i) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={i}
                  onClick={() => navigate("what-we-do")}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#16a34a40] group hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-[#f0fdf4] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#16a34a] transition-colors">
                    <IconComponent className="w-7 h-7 text-[#16a34a] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-black text-[#0f172a] text-lg mb-0.5">
                    {service.title}
                  </h3>
                  <p className="text-[#16a34a] text-xs font-semibold mb-2">
                    {service.sub}
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {service.desc}
                  </p>
                  <div className="mt-4 text-[#16a34a] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Find out more <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Button
              onClick={() => navigate("what-we-do")}
              className="border-2 border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white rounded-full px-8 py-3 font-bold transition-colors"
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* ── About / Why Choose Us ── */}
      <section className="py-20 bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
              About RISLIX
            </p>
            <h2 className="text-4xl font-black leading-tight mb-6">
              The Perfect Partner for
              <br />
              <span className="text-[#16a34a]">Complete Cyber Protection</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              In a world where threats evolve every hour, RISLIX delivers
              enterprise-grade cybersecurity, compliance, and governance
              solutions designed to protect your business from every angle. We
              help organizations stay secure, compliant, resilient, and prepared
              — no matter how complex the challenge.
            </p>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#16a34a20] rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">
                    High Quality Service
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Advanced, end-to-end cybersecurity and governance services
                    tailored to your environment, delivered with precision and
                    operational excellence.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#16a34a20] rounded-xl flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5 text-[#16a34a]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">
                    Effective Consultation
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Aligns business objectives with risk, compliance, and
                    governance through clear, practical, and auditable
                    frameworks that transform regulatory requirements into
                    actionable controls.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button
                onClick={() => navigate("about-us")}
                className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full px-8 py-3 font-bold transition-colors"
              >
                Learn More About Us
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { num: "30+", label: "Cybersecurity Projects" },
              { num: "100%", label: "Service Guarantee" },
              { num: "10+", label: "Team Experts" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-[#ffffff08] border border-[#ffffff12] rounded-2xl p-6 text-center"
              >
                <div className="text-3xl font-black text-[#16a34a] mb-2">
                  {s.num}
                </div>
                <div className="text-gray-400 text-xs leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
            <div className="col-span-3 bg-[#16a34a12] border border-[#16a34a30] rounded-2xl p-6">
              <h4 className="font-black text-[#16a34a] text-lg mb-3">
                Why Choose RISLIX?
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "ISO-Aligned Governance Frameworks",
                  "Regulatory Compliance Expertise",
                  "Risk, Continuity & Audit Readiness",
                  "Active Threat Monitoring",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <CheckCircle className="w-4 h-4 text-[#16a34a] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us Detail ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
              Our Differentiators
            </p>
            <h2 className="text-4xl font-black text-[#0f172a]">
              Governance-Driven Security for
              <br />
              <span className="text-[#16a34a]">Regulated Environments</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 leading-relaxed">
              At RISLIX, we combine deep expertise, advanced technology, and
              global compliance knowledge to deliver cybersecurity you can rely
              on.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Gavel,
                title: "Governance",
                desc: "Compliance built on ISO 27001, NIST CSF, SOC 2, and regional standards for robust, auditable governance.",
              },
              {
                icon: Scale,
                title: "Regulatory Compliance",
                desc: "Deep expertise across SAMA, NCA, GDPR, HIPAA, CCPA, UAE PDPL, Qatar PDPPL, FedRAMP, and CMMC.",
              },
              {
                icon: RefreshCw,
                title: "Risk & Audit Readiness",
                desc: "Continuous risk register management, audit preparation, evidence collection, and control lifecycle governance.",
              },
              {
                icon: Headphones,
                title: "Support & Remote Assistance",
                desc: "Dedicated technical support and remote assistance for immediate issue resolution, system guidance, and proactive monitoring for subscribed clients.",
              },
            ].map((c, i) => {
              const IconComponent = c.icon;
              return (
                <div
                  key={i}
                  className="border border-gray-100 rounded-2xl p-7 shadow-md hover:shadow-xl transition-all hover:border-[#16a34a40] hover:-translate-y-1 duration-300"
                >
                  <div className="w-14 h-14 bg-[#f0fdf4] rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-[#16a34a]" />
                  </div>
                  <h3 className="font-bold text-[#0f172a] text-lg mb-2">
                    {c.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader
              title="Our Engagement Process"
              subtitle="How We Work"
              centered={false}
            />
            <ProcessStep
              number="1"
              title="Discovery & Scoping"
              description="We begin with a comprehensive discovery session to understand your current security posture, business objectives, regulatory obligations, and risk appetite."
              sub="Free 30-minute initial consultation"
            />
            <ProcessStep
              number="2"
              title="Assessment & Gap Analysis"
              description="Our experts conduct a thorough assessment against relevant standards and frameworks, identifying gaps, risks, and priority remediation areas."
              sub="Detailed gap analysis report"
            />
            <ProcessStep
              number="3"
              title="Strategy & Roadmap Design"
              description="We design a customised cybersecurity strategy, target operating model, and prioritised roadmap aligned with your business goals and compliance requirements."
              sub="Tailored security roadmap"
            />
            <ProcessStep
              number="4"
              title="Implementation & Governance"
              description="We implement controls, policies, and governance frameworks — and provide training to empower your team and embed security into your culture."
              sub="Hands-on implementation support"
            />
            <ProcessStep
              number="5"
              title="Continuous Monitoring & Advisory"
              description="Ongoing advisory, compliance monitoring, risk register updates, and audit preparation ensure you remain secure and audit-ready year-round."
              sub="Continuous support & improvement"
            />
          </div>
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-2">
              Still Confused About Our Services?
            </h3>
            <p className="text-gray-400 mb-2">
              For a free initial 30-minute consultancy, please contact us.
            </p>
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-4 h-4 text-[#16a34a]" />
              <a
                href="mailto:info@rislix.com"
                className="text-[#16a34a] font-semibold text-sm hover:underline"
              >
                info@rislix.com
              </a>
            </div>
            <ContactForm dark />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
                The Threat Landscape
              </p>
              <h2 className="text-4xl font-black text-white leading-tight mb-6">
                Don't Become a<br />
                <span className="text-[#16a34a]">Cyber Statistic</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Nearly half of all UK SMEs experienced a cyber attack last
                  year. In regulated industries — banking, government,
                  healthcare — the consequences of a breach extend far beyond
                  financial loss.
                </p>
                <p>
                  Regulatory fines, reputational damage, and operational
                  disruption can be existential. RISLIX helps you get ahead of
                  the threat with proactive governance, continuous monitoring,
                  and compliance readiness.
                </p>
              </div>
              <div className="mt-8">
                <Button
                  onClick={() => navigate("contact")}
                  className="bg-[#16a34a] hover:bg-[#15803d] text-white rounded-full px-8 py-3 font-bold transition-colors"
                >
                  Get Protected Now
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <StatCard
                number={65}
                label="of medium-sized businesses were hit by a cyber attack in the latest government survey"
              />
              <StatCard
                number={71}
                label="of breaches are financially motivated — regulated industries are prime targets"
              />
              <StatCard
                number={95}
                label="of cybersecurity incidents can be prevented with the right governance controls"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="What Our Clients Say" subtitle="Testimonials" />
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="The team demonstrated deep expertise in SAMA, NCA, and PDPL compliance. Their structured approach and attention to detail helped us significantly strengthen our cybersecurity and governance posture."
              // name="Client"
              role="CISO"
              company="Leading Insurance Provider (KSA)"
            />

            <TestimonialCard
              quote="Their support in implementing AI governance and ISO standards brought clarity and structure to our processes. We were able to achieve compliance readiness much faster than expected."
              // name="Client"
              role="CEO"
              company="Blockchain & Web3 Software House"
            />

            <TestimonialCard
              quote="A highly professional engagement. Their work on data privacy and regulatory alignment helped us meet national compliance requirements while improving internal data protection practices."
              // name="Client"
              role="Head of Compliance"
              company="Public Sector Organization"
            />

            <TestimonialCard
              quote="Their expertise in ISO frameworks and audit readiness was instrumental. The team ensured we were fully prepared with proper documentation, controls, and evidence for successful assessments."
              // name="Client"
              role="IT Director"
              company="Enterprise Technology Company"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader title="Frequently Asked Questions" subtitle="FAQ" />
          <div className="space-y-3">
            {faqsData.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0f172a]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#16a34a] transition-transform shrink-0 ml-4 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-500">
            Still have questions?{" "}
            <button
              onClick={() => navigate("contact")}
              className="text-[#16a34a] font-semibold hover:underline"
            >
              Contact us
            </button>{" "}
            or email{" "}
            <a
              href="mailto:info@rislix.com"
              className="text-[#16a34a] font-semibold hover:underline"
            >
              info@rislix.com
            </a>
          </p>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Latest Insights" subtitle="Knowledge Centre" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsData.map((news, i) => {
              const IconComponent = news.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  onClick={() => navigate("knowledge-centre")}
                >
                  <div className="h-40 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] flex items-center justify-center">
                    <IconComponent className="w-16 h-16 text-[#16a34a]" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs bg-[#f0fdf4] text-[#16a34a] font-semibold px-2 py-1 rounded-full border border-[#16a34a30]">
                        {news.tag}
                      </span>
                      <span className="text-xs text-gray-400">{news.date}</span>
                    </div>
                    <h3 className="font-bold text-[#0f172a] text-sm group-hover:text-[#16a34a] transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-[#16a34a] text-xs font-semibold mt-3 flex items-center gap-1">
                      Read more <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-gradient-to-r from-[#1e3a8a] to-[#16a34a] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">
            Ready to Build Cyber Confidence?
          </h2>
          <p className="text-white/80 mb-3 text-lg">
            For a free initial 30-minute consultancy please contact
          </p>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Mail className="w-6 h-6" />
            <a
              href="mailto:info@rislix.com"
              className="text-white font-black text-2xl hover:underline"
            >
              info@rislix.com
            </a>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="dark"
              size="lg"
              onClick={() => navigate("contact")}
              className="bg-[#0f172a] text-white hover:bg-black rounded-full px-8 py-4 font-bold"
            >
              Get a Free Assessment
            </Button>
            <Button
              size="lg"
              onClick={() => navigate("pricing")}
              className="bg-white !text-[#16a34a] hover:bg-gray-100 rounded-full px-8 py-4 font-bold"
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
