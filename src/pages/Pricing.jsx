import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";

const plans = [
  {
    name:"vCISO – Starter",price:"£1,500",period:"/month",badge:"",highlighted:false,
    features:["Up to 8 hrs/month advisory","Security governance setup","Board reporting template","Risk register baseline","Email & call support","Monthly review session"],
    cta:"Get Started",
  },
  {
    name:"vCISO – Professional",price:"£3,500",period:"/month",badge:"Most Popular",highlighted:true,
    features:["Up to 20 hrs/month advisory","ISO 27001 / NIST CSF roadmap","Full risk management framework","Audit preparation support","Regulator liaison","Quarterly strategy sessions"],
    cta:"Get Started",
  },
  {
    name:"vDPO – Data Privacy",price:"£1,200",period:"/month",badge:"",highlighted:false,
    features:["GDPR / regional PDPL compliance","DPIA program management","ROPA documentation","Data breach response support","Vendor processor assessments","Privacy policy review"],
    cta:"Get Started",
  },
  {
    name:"GRC – Implementation",price:"£4,500",period:"one-time",badge:"",highlighted:false,
    features:["ISO 27001 / NIST CSF gap analysis","Policy & procedure library","Risk & control frameworks","Country-specific compliance mapping","Evidence collection support","Certification audit preparation"],
    cta:"Get a Quote",
  },
  {
    name:"VAPT – Essentials",price:"£2,500",period:"per engagement",badge:"",highlighted:false,
    features:["Network pen test (internal/external)","Web application & API testing","Executive + technical report","CVSS-scored findings","Remediation roadmap","Re-test included"],
    cta:"Get a Quote",
  },
  {
    name:"Managed Advisory",price:"Custom",period:"",badge:"Enterprise",highlighted:false,
    features:["All services bundled","Dedicated advisory team","Custom SLA & coverage","Continuous compliance monitoring","Monthly governance reviews","Unlimited policy support"],
    cta:"Contact Us",
  },
];

export default function Pricing({ navigate }) {
  return (
    <div>
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">Transparent Pricing</p>
          <h1 className="text-5xl font-black mb-6">Pricing</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">Clear, transparent pricing with no hidden fees. Contact us for a tailored quote based on your specific needs.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan,i) => (
              <div key={i} className={`bg-white rounded-2xl border-2 overflow-hidden relative ${plan.highlighted?"border-[#16a34a] shadow-2xl shadow-[#16a34a20] scale-105":"border-gray-100 shadow-md"}`}>
                {plan.badge && <div className={`absolute top-0 right-0 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl ${plan.highlighted?"bg-[#16a34a]":"bg-[#0f172a]"}`}>{plan.badge}</div>}
                <div className={`p-8 ${plan.highlighted?"bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] text-white":""}`}>
                  <h3 className={`font-black text-xl mb-3 ${plan.highlighted?"text-white":"text-[#0f172a]"}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-1">
                    <span className={`text-4xl font-black ${plan.highlighted?"text-[#16a34a]":"text-[#0f172a]"}`}>{plan.price}</span>
                    {plan.period && <span className={`text-sm mb-2 ${plan.highlighted?"text-gray-400":"text-gray-500"}`}>{plan.period}</span>}
                  </div>
                  <p className={`text-sm ${plan.highlighted?"text-gray-400":"text-gray-500"}`}>+ VAT where applicable</p>
                </div>
                <div className="p-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#16a34a] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate("contact")} className={`w-full py-3 rounded-full font-bold transition-colors ${plan.highlighted?"bg-[#16a34a] text-white hover:bg-[#15803d]":"border-2 border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white"}`}>{plan.cta}</button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">All prices are indicative. Final pricing depends on organization size, scope, and jurisdiction. <button onClick={() => navigate("contact")} className="text-[#16a34a] font-semibold hover:underline">Contact us</button> or email <a href="mailto:info@rislix.com" className="text-[#16a34a] font-semibold hover:underline">info@rislix.com</a> for a tailored quote.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader title="Why Choose RISLIX?" subtitle="Our Value" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[["🔍","Transparent Pricing","No hidden fees ever"],["🏆","Expert Team","Certified practitioners"],["🌍","Global Coverage","GCC, UK, EU, US"],["⚡","Fast Engagement","Start within 1–2 weeks"]].map(([icon,title,desc]) => (
              <div key={title} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-[#0f172a] mb-1">{title}</h3>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1e3a8a] text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-3">Still Confused About Our Services?</h2>
          <p className="text-white/80 mb-6">For a free initial 30-minute consultancy please contact</p>
          <a href="mailto:info@rislix.com" className="text-white font-black text-2xl hover:underline block mb-6">info@rislix.com</a>
          <Button onClick={() => navigate("contact")} className="bg-[#0f172a] text-white hover:bg-black rounded-full px-8 py-3 font-bold transition-colors">Book Free Consultation</Button>
        </div>
      </section>
    </div>
  );
}
