import { useState } from "react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import ServiceCard from "../components/ServiceCard";
import StatCard from "../components/StatCard";
import ProcessStep from "../components/ProcessStep";
import TestimonialCard from "../components/TestimonialCard";
import ContactForm from "../components/ContactForm";

const services = [
  { icon: "🛡️", title: "vCISO", sub: "Virtual Chief Information Security Officer", desc: "Executive-level cybersecurity leadership without the cost of a full-time CISO." },
  { icon: "🔏", title: "vDPO", sub: "Virtual Data Protection Officer", desc: "Expert data privacy leadership tailored to global and regional privacy laws." },
  { icon: "📋", title: "GRC", sub: "Governance, Risk & Compliance", desc: "Premium tailored governance frameworks, controls, policies, and regulatory alignment." },
  { icon: "🎯", title: "VAPT", sub: "Cybersecurity Assessments & VAPT", desc: "Identifying, validating, and mitigating vulnerabilities across digital ecosystems." },
  { icon: "🏗️", title: "Security Architecture", sub: "Enterprise Security Architecture & Hardening", desc: "End-to-end design and enhancement of secure digital environments." },
  { icon: "♻️", title: "BCM / DR", sub: "Business Continuity & ISO 22301", desc: "Ensuring organizations remain resilient against disruption with BIA, DR, and crisis plans." },
  { icon: "🤖", title: "AI Governance", sub: "Responsible AI Compliance", desc: "Aligning AI systems with global ethical, safety, and regulatory standards." },
  { icon: "📡", title: "Managed Advisory", sub: "Continuous Cybersecurity Advisory", desc: "Ongoing subscription-based advisory — compliance monitoring, audits, risk registers." },
];

const industries = [
  { icon: "🏛️", name: "Government" },
  { icon: "🏦", name: "Banking & Finance" },
  { icon: "🎓", name: "Education" },
  { icon: "📡", name: "Telecom" },
  { icon: "💻", name: "Information Technology" },
  { icon: "⚙️", name: "Software & IT" },
];

const faqs = [
  { q: "What is a vCISO and does my organization need one?", a: "A vCISO (Virtual CISO) provides executive-level cybersecurity leadership without the overhead of a full-time hire. If your organization needs strategic direction, compliance oversight, board reporting, or risk governance — a vCISO is the right fit." },
  { q: "Which compliance frameworks does RISLIX cover?", a: "We cover ISO 27001, NIST CSF, SOC 2, SAMA, NCA ECC/CCC, CMMC, Cyber Essentials, FedRAMP, HIPAA, PCI DSS, GDPR, Qatar PDPPL, KSA PDPL, UAE PDPL, and many more." },
  { q: "Do you serve organizations outside the Middle East?", a: "Yes. RISLIX serves clients globally including the UK, US, EU, and GCC regions. Our compliance expertise spans regional frameworks across all major jurisdictions." },
  { q: "What is included in a VAPT engagement?", a: "Our VAPT includes network penetration testing, web/API testing, mobile app security, cloud assessments (Azure/AWS/GCP), social engineering, red team exercises, and a full technical report with CVSS scoring and remediation guidance." },
  { q: "How quickly can we get started?", a: "We offer a free 30-minute initial consultation. Following scoping, most engagements begin within 1–2 weeks. Contact info@rislix.com to get started." },
  { q: "Does RISLIX help with AI governance?", a: "Yes. We provide AI risk assessments, AI lifecycle governance, model transparency reviews, and alignment with ISO 42001, NIST AI RMF, and the EU AI Act." },
];

const news = [
  { title: "Understanding the NCA ECC Framework for Saudi Organizations", tag: "Guide", date: "Feb 2026", icon: "🇸🇦" },
  { title: "ISO 42001: What the AI Management Standard Means for Your Business", tag: "Article", date: "Jan 2026", icon: "🤖" },
  { title: "DORA Compliance: What Financial Firms Need to Know", tag: "News", date: "Dec 2025", icon: "🏦" },
  { title: "vCISO vs Full-Time CISO: Which Is Right for Your Organization?", tag: "Guide", date: "Nov 2025", icon: "🛡️" },
];

export default function Home({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-[#0d1b2a] text-white overflow-hidden min-h-[88vh] flex items-center">
        {/* background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-[#f5a62308] rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#f5a62305] rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"radial-gradient(circle at 1px 1px, #f5a623 1px, transparent 0)",backgroundSize:"44px 44px"}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f5a62318] text-[#f5a623] px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-[#f5a62330]">
              <span className="w-2 h-2 bg-[#f5a623] rounded-full animate-pulse"></span>
              Cybersecurity · Privacy · GRC · AI Governance
            </div>
            <h1 className="text-4xl lg:text-[3.2rem] font-black leading-tight mb-6 tracking-tight">
              Compliance That Inspires<br />
              <span className="text-[#f5a623]">Confidence,</span> Security That<br />
              Enables <span className="text-[#f5a623]">Growth.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-xl">
              Our comprehensive cybersecurity, governance, and digital risk services help organizations build trust, reduce uncertainty, and stay audit-ready year-round.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" onClick={() => navigate("contact")}
                className="bg-[#f5a623] hover:bg-[#e09415] text-white rounded-full">
                Get a Free Assessment
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate("what-we-do")}
                className="border-white text-white hover:bg-white hover:text-[#0d1b2a] rounded-full">
                Explore Services
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-10">
              {["ISO 27001","NIST CSF","SAMA","NCA ECC","GDPR","SOC 2","PCI DSS","CMMC"].map(b => (
                <span key={b} className="bg-[#ffffff0c] text-gray-300 text-xs px-3 py-1.5 rounded-lg border border-[#ffffff12] font-medium">{b}</span>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-96 h-96">
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-[#f5a62320] animate-ping" style={{animationDuration:"3s"}}></div>
              <div className="absolute inset-6 rounded-full border border-[#f5a62330]"></div>
              <div className="absolute inset-12 rounded-full border border-[#f5a62345]"></div>
              <div className="absolute inset-20 rounded-full border border-[#f5a62360]"></div>
              <div className="absolute inset-28 rounded-full bg-[#f5a62318] border border-[#f5a62380] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-[#f5a623] font-black text-2xl tracking-widest">RISLIX</div>
                  <div className="text-gray-400 text-xs tracking-wider mt-1">CYBER · GRC · AI</div>
                </div>
              </div>
              {/* Floating badges */}
              {[
                {label:"ISO 27001",pos:"top-6 right-2",icon:"🏆"},
                {label:"GDPR Ready",pos:"top-24 -right-4",icon:"🇪🇺"},
                {label:"NCA ECC",pos:"bottom-20 -right-2",icon:"🇸🇦"},
                {label:"NIST CSF",pos:"bottom-6 right-8",icon:"🇺🇸"},
                {label:"24/7 Advisory",pos:"top-10 -left-4",icon:"📡"},
                {label:"AI Governance",pos:"bottom-14 left-0",icon:"🤖"},
              ].map(b => (
                <div key={b.label} className={`absolute ${b.pos} bg-[#0d1b2a] border border-[#f5a62340] text-white px-3 py-1.5 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap`}>
                  <span>{b.icon}</span>{b.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries Banner ── */}
      <section className="bg-[#f5a623] py-5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-[#0d1b2a] font-bold text-sm uppercase tracking-widest mb-3">
            Delivering Cyber Confidence Across Multiple Industries
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {industries.map(ind => (
              <div key={ind.name} className="flex items-center gap-2 text-[#0d1b2a] font-semibold text-sm">
                <span className="text-xl">{ind.icon}</span>{ind.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Our Services" subtitle="What We Deliver" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s,i) => (
              <div key={i} onClick={() => navigate("what-we-do")}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#f5a62340] group hover:-translate-y-1">
                <div className="w-14 h-14 bg-[#fff8ec] rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:bg-[#f5a623] transition-colors">{s.icon}</div>
                <h3 className="font-black text-[#0d1b2a] text-lg mb-0.5">{s.title}</h3>
                <p className="text-[#f5a623] text-xs font-semibold mb-2">{s.sub}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <div className="mt-4 text-[#f5a623] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">Find out more →</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => navigate("what-we-do")} className="border-2 border-[#f5a623] text-[#f5a623] hover:bg-[#f5a623] hover:text-white rounded-full px-8 py-3 font-bold transition-colors">
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* ── About / Why Choose Us ── */}
      <section className="py-20 bg-[#0d1b2a] text-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#f5a623] font-semibold uppercase tracking-widest text-sm mb-3">About RISLIX</p>
            <h2 className="text-4xl font-black leading-tight mb-6">
              The Perfect Partner for<br /><span className="text-[#f5a623]">Complete Cyber Protection</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              In a world where threats evolve every hour, RISLIX delivers enterprise-grade cybersecurity, compliance, and governance solutions designed to protect your business from every angle. We help organizations stay secure, compliant, resilient, and prepared — no matter how complex the challenge.
            </p>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#f5a62320] rounded-xl flex items-center justify-center text-xl shrink-0">⭐</div>
                <div>
                  <h4 className="font-bold text-white mb-1">High Quality Service</h4>
                  <p className="text-gray-400 text-sm">Advanced, end-to-end cybersecurity and governance services tailored to your environment, delivered with precision and operational excellence.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#f5a62320] rounded-xl flex items-center justify-center text-xl shrink-0">💡</div>
                <div>
                  <h4 className="font-bold text-white mb-1">Effective Consultation</h4>
                  <p className="text-gray-400 text-sm">Aligns business objectives with risk, compliance, and governance through clear, practical, and auditable frameworks that transform regulatory requirements into actionable controls.</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Button onClick={() => navigate("about-us")} className="bg-[#f5a623] hover:bg-[#e09415] text-white rounded-full px-8 py-3 font-bold transition-colors">Learn More About Us</Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              {num:"30+",label:"Cybersecurity Projects"},
              {num:"100%",label:"Service Guarantee"},
              {num:"10+",label:"Team Experts"},
            ].map(s => (
              <div key={s.label} className="bg-[#ffffff08] border border-[#ffffff12] rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-[#f5a623] mb-2">{s.num}</div>
                <div className="text-gray-400 text-xs leading-tight">{s.label}</div>
              </div>
            ))}
            <div className="col-span-3 bg-[#f5a62312] border border-[#f5a62330] rounded-2xl p-6">
              <h4 className="font-black text-[#f5a623] text-lg mb-3">Why Choose RISLIX?</h4>
              <div className="grid grid-cols-2 gap-2">
                {["ISO-Aligned Governance Frameworks","Regulatory Compliance Expertise","Risk, Continuity & Audit Readiness","24/7 Support & Remote Assistance"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-[#f5a623] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
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
            <p className="text-[#f5a623] font-semibold uppercase tracking-widest text-sm mb-3">Our Differentiators</p>
            <h2 className="text-4xl font-black text-[#0d1b2a]">Governance-Driven Security for<br /><span className="text-[#f5a623]">Regulated Environments</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-4 leading-relaxed">At RISLIX, we combine deep expertise, advanced technology, and global compliance knowledge to deliver cybersecurity you can rely on.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {icon:"📐",title:"ISO-Aligned Governance",desc:"Frameworks built on ISO 27001, NIST CSF, SOC 2, and regional standards for robust, auditable governance."},
              {icon:"⚖️",title:"Regulatory Compliance",desc:"Deep expertise across SAMA, NCA, GDPR, HIPAA, CCPA, UAE PDPL, Qatar PDPPL, FedRAMP, and CMMC."},
              {icon:"🔄",title:"Risk & Audit Readiness",desc:"Continuous risk register management, audit preparation, evidence collection, and control lifecycle governance."},
              {icon:"🕐",title:"24/7 Support",desc:"Round-the-clock advisory support, incident guidance, and continuous compliance monitoring for subscribed clients."},
            ].map((c,i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-7 shadow-md hover:shadow-xl transition-all hover:border-[#f5a62340] hover:-translate-y-1 duration-300">
                <div className="w-14 h-14 bg-[#fff8ec] rounded-xl flex items-center justify-center text-2xl mb-4">{c.icon}</div>
                <h3 className="font-bold text-[#0d1b2a] text-lg mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <SectionHeader title="Our Engagement Process" subtitle="How We Work" centered={false} />
            <ProcessStep number="1" title="Discovery & Scoping" description="We begin with a comprehensive discovery session to understand your current security posture, business objectives, regulatory obligations, and risk appetite." sub="Free 30-minute initial consultation" />
            <ProcessStep number="2" title="Assessment & Gap Analysis" description="Our experts conduct a thorough assessment against relevant standards and frameworks, identifying gaps, risks, and priority remediation areas." sub="Detailed gap analysis report" />
            <ProcessStep number="3" title="Strategy & Roadmap Design" description="We design a customised cybersecurity strategy, target operating model, and prioritised roadmap aligned with your business goals and compliance requirements." sub="Tailored security roadmap" />
            <ProcessStep number="4" title="Implementation & Governance" description="We implement controls, policies, and governance frameworks — and provide training to empower your team and embed security into your culture." sub="Hands-on implementation support" />
            <ProcessStep number="5" title="Continuous Monitoring & Advisory" description="Ongoing advisory, compliance monitoring, risk register updates, and audit preparation ensure you remain secure and audit-ready year-round." sub="Continuous support & improvement" />
          </div>
          <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1a2f45] rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-2">Still Confused About Our Services?</h3>
            <p className="text-gray-400 mb-2">For a free initial 30-minute consultancy, please contact us.</p>
            <a href="mailto:info@rislix.com" className="text-[#f5a623] font-semibold text-sm mb-6 block hover:underline">info@rislix.com</a>
            <ContactForm dark />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-[#0d1b2a]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#f5a623] font-semibold uppercase tracking-widest text-sm mb-3">The Threat Landscape</p>
              <h2 className="text-4xl font-black text-white leading-tight mb-6">Don't Become a<br /><span className="text-[#f5a623]">Cyber Statistic</span></h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>Nearly half of all UK SMEs experienced a cyber attack last year. In regulated industries — banking, government, healthcare — the consequences of a breach extend far beyond financial loss.</p>
                <p>Regulatory fines, reputational damage, and operational disruption can be existential. RISLIX helps you get ahead of the threat with proactive governance, continuous monitoring, and compliance readiness.</p>
              </div>
              <div className="mt-8">
                <Button onClick={() => navigate("contact")} className="bg-[#f5a623] hover:bg-[#e09415] text-white rounded-full px-8 py-3 font-bold transition-colors">Get Protected Now</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <StatCard number={65} label="of medium-sized businesses were hit by a cyber attack in the latest government survey" />
              <StatCard number={71} label="of breaches are financially motivated — regulated industries are prime targets" />
              <StatCard number={95} label="of cybersecurity incidents can be prevented with the right governance controls" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="What Our Clients Say" subtitle="Testimonials" />
          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard quote="RISLIX transformed our compliance posture from reactive to proactive. Their vCISO service gave us the board-level reporting and ISO 27001 roadmap we desperately needed. Exceptional expertise." name="Ahmed Al-Rashidi" role="CTO" company="Gulf FinTech Group" />
            <TestimonialCard quote="The GRC framework RISLIX implemented helped us pass our SAMA audit with zero major findings. Their team understands both the regulatory language and the practical implementation challenges." name="Sarah Mitchell" role="Head of Compliance" company="Meridian Capital" />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader title="Frequently Asked Questions" subtitle="FAQ" />
          <div className="space-y-3">
            {faqs.map((faq,i) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden">
                <button className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                  <span className="font-semibold text-[#0d1b2a]">{faq.q}</span>
                  <svg className={`w-5 h-5 text-[#f5a623] transition-transform shrink-0 ml-4 ${openFaq===i?"rotate-180":""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                </button>
                {openFaq===i && <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-500">Still have questions? <button onClick={() => navigate("contact")} className="text-[#f5a623] font-semibold hover:underline">Contact us</button> or email <a href="mailto:info@rislix.com" className="text-[#f5a623] font-semibold hover:underline">info@rislix.com</a></p>
        </div>
      </section>

      {/* ── Latest News ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Latest Insights" subtitle="Knowledge Centre" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((n,i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer" onClick={() => navigate("knowledge-centre")}>
                <div className="h-40 bg-gradient-to-br from-[#0d1b2a] to-[#1a2f45] flex items-center justify-center">
                  <span className="text-5xl">{n.icon}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-[#fff8ec] text-[#f5a623] font-semibold px-2 py-1 rounded-full border border-[#f5a62330]">{n.tag}</span>
                    <span className="text-xs text-gray-400">{n.date}</span>
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] text-sm group-hover:text-[#f5a623] transition-colors line-clamp-2">{n.title}</h3>
                  <p className="text-[#f5a623] text-xs font-semibold mt-3">Read more →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-gradient-to-r from-[#f5a623] to-[#e09415] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Build Cyber Confidence?</h2>
          <p className="text-white/80 mb-3 text-lg">For a free initial 30-minute consultancy please contact</p>
          <a href="mailto:info@rislix.com" className="text-white font-black text-2xl hover:underline block mb-8">info@rislix.com</a>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="dark" size="lg" onClick={() => navigate("contact")} className="bg-[#0d1b2a] text-white hover:bg-black rounded-full px-8 py-4 font-bold">Get a Free Assessment</Button>
            <Button size="lg" onClick={() => navigate("pricing")} className="bg-white text-[#f5a623] hover:bg-gray-100 rounded-full px-8 py-4 font-bold">View Pricing</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
