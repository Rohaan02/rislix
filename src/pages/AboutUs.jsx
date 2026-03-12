import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";

const values = [
  {icon:"🔍",title:"Transparency",desc:"We operate with an open-book policy. No hidden fees, no ambiguous language. We believe informed clients are the best clients."},
  {icon:"🏆",title:"Excellence",desc:"We never compromise on quality. Every engagement is delivered with precision, expertise, and a commitment to operational excellence."},
  {icon:"💡",title:"Innovation",desc:"Cyber threats evolve every day, and so do we. Continual training, research, and development keep us ahead of the curve."},
  {icon:"🤝",title:"Customer-Centric",desc:"Your security is our success. Our 24/7 availability ensures your business operations never have to pause because of a cybersecurity concern."},
];

const team = [
  {name:"Vincent Picton",role:"Founder & CEO",icon:"👤",bio:"20+ years in cybersecurity, governance, and compliance across regulated industries globally."},
  {name:"James Harrison",role:"Head of VAPT",icon:"👤",bio:"CREST certified penetration tester with expertise in web, API, and cloud security."},
  {name:"Priya Sharma",role:"GRC & Privacy Lead",icon:"👤",bio:"Qualified DPO and IASME certified assessor specialising in ISO 27001 and GDPR."},
  {name:"Tom Bradley",role:"vCISO Practice Lead",icon:"👤",bio:"Former CISO with 15+ years advising boards and regulators across finance and government."},
];

export default function AboutUs({ navigate }) {
  return (
    <div>
      <section className="bg-[#0d1b2a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#f5a623] font-semibold uppercase tracking-widest text-sm mb-3">Our Story</p>
          <h1 className="text-5xl font-black mb-6">About RISLIX</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">Enterprise-grade cybersecurity, compliance, and governance — built for regulated organisations worldwide.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#f5a623] font-semibold uppercase tracking-widest text-sm mb-3">Who We Are</p>
            <h2 className="text-4xl font-black text-[#0d1b2a] mb-6">The Perfect Partner for <span className="text-[#f5a623]">Complete Cyber Protection</span></h2>
            <p className="text-gray-600 leading-relaxed mb-4">In a world where threats evolve every hour, RISLIX delivers enterprise-grade cybersecurity, compliance, and governance solutions designed to protect your business from every angle.</p>
            <p className="text-gray-600 leading-relaxed mb-4">We help organizations stay secure, compliant, resilient, and prepared — no matter how complex the challenge. From ISO 27001 implementation to vCISO leadership, from GDPR programs to AI governance, RISLIX is your single trusted partner.</p>
            <p className="text-gray-600 leading-relaxed mb-8">Our team combines deep technical expertise with regulatory intelligence across the Middle East, Europe, the UK, and the United States.</p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[["30+","Cybersecurity Projects"],["100%","Service Guarantee"],["10+","Team Experts"]].map(([n,l]) => (
                <div key={l} className="text-center bg-[#fff8ec] rounded-2xl p-4 border border-[#f5a62330]">
                  <div className="text-2xl font-black text-[#f5a623]">{n}</div>
                  <div className="text-xs text-gray-500 mt-1">{l}</div>
                </div>
              ))}
            </div>
            <Button onClick={() => navigate("contact")} className="bg-[#f5a623] hover:bg-[#e09415] text-white rounded-full px-8 py-3 font-bold transition-colors">Get in Touch</Button>
          </div>
          <div className="bg-gradient-to-br from-[#0d1b2a] to-[#1a2f45] rounded-3xl p-12 text-white text-center">
            <div className="w-28 h-28 mx-auto mb-6 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#f5a62325]"></div>
              <div className="absolute inset-3 rounded-full border-2 border-[#f5a62445]"></div>
              <div className="absolute inset-6 rounded-full border-2 border-[#f5a62365]"></div>
              <div className="absolute inset-9 rounded-full bg-[#f5a623] flex items-center justify-center">
                <span className="text-2xl font-black text-white">R</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">RISLIX</h3>
            <p className="text-[#f5a623] font-semibold mb-4 text-sm">Cyber · Privacy · GRC · AI</p>
            <p className="text-gray-400 text-sm leading-relaxed">Founded to make enterprise-grade cybersecurity and compliance accessible to every organization — regardless of size, sector, or geography.</p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[["🌍","Global Coverage"],["⚖️","Regulatory Experts"],["🔒","ISO Certified"],["🤝","Trusted Advisors"]].map(([icon,v]) => (
                <div key={v} className="bg-[#ffffff0c] rounded-xl p-3 text-sm font-semibold border border-[#ffffff10]"><div className="text-xl mb-1">{icon}</div>{v}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Our Core Values" subtitle="What Drives Us" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v,i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 hover:shadow-xl hover:border-[#f5a62340] transition-all">
                <div className="w-14 h-14 bg-[#fff8ec] rounded-xl flex items-center justify-center mb-4 text-2xl">{v.icon}</div>
                <h3 className="font-bold text-xl text-[#0d1b2a] mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Meet the Team" subtitle="Our Experts" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m,i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0d1b2a] to-[#1a2f45] rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👤</div>
                <h3 className="font-bold text-[#0d1b2a]">{m.name}</h3>
                <p className="text-[#f5a623] text-sm font-semibold mb-2">{m.role}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0d1b2a] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Certifications & Standards Expertise</h2>
          <p className="text-gray-400 mb-8">Our team holds and works with the highest accreditations and standards in the industry.</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["ISO 27001:2022","ISO 42001","NIST CSF","SAMA Framework","NCA ECC","GDPR","SOC 2","PCI DSS","CMMC","FedRAMP","HIPAA","Cyber Essentials"].map(c => (
              <span key={c} className="bg-[#ffffff10] border border-[#ffffff15] text-gray-300 px-4 py-2 rounded-xl text-sm font-medium">{c}</span>
            ))}
          </div>
          <Button onClick={() => navigate("contact")} className="bg-[#f5a623] hover:bg-[#e09415] text-white rounded-full px-8 py-3 font-bold transition-colors">Work With Us</Button>
        </div>
      </section>
    </div>
  );
}
