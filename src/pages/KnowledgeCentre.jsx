import { useState } from "react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";

const articles = [
  {title:"Understanding the NCA ECC Framework for Saudi Organizations",tag:"Guide",date:"Feb 2026",icon:"🇸🇦",desc:"A comprehensive walkthrough of the NCA Essential Cybersecurity Controls, what each domain requires, and how to build your compliance program from scratch."},
  {title:"ISO 42001: What the AI Management Standard Means for Your Business",tag:"Article",date:"Jan 2026",icon:"🤖",desc:"ISO 42001 is the world's first AI management system standard. Here's what it covers, who needs it, and how to align your AI governance program."},
  {title:"DORA Compliance: What Financial Firms Need to Know",tag:"News",date:"Dec 2025",icon:"🏦",desc:"The EU's Digital Operational Resilience Act (DORA) came into force in January 2025. This guide explains the key requirements and how financial institutions should prepare."},
  {title:"vCISO vs Full-Time CISO: Which Is Right for Your Organization?",tag:"Guide",date:"Nov 2025",icon:"🛡️",desc:"Should you hire a full-time CISO or engage a virtual CISO? We break down the cost, coverage, and capability differences to help you make the right choice."},
  {title:"SAMA Cybersecurity Framework: A Practical Guide for KSA Banks",tag:"Guide",date:"Oct 2025",icon:"💳",desc:"The SAMA framework is mandatory for all financial institutions in Saudi Arabia. This guide walks through the domains, maturity levels, and how to pass your assessment."},
  {title:"Qatar PDPPL Explained: What Businesses Need to Do Now",tag:"Article",date:"Sep 2025",icon:"🇶🇦",desc:"Qatar's Personal Data Protection Law is now in force. We explain the key obligations, consent requirements, and how to build your compliance program."},
  {title:"What Is a Data Protection Impact Assessment (DPIA)?",tag:"Guide",date:"Aug 2025",icon:"🔏",desc:"DPIAs are required under GDPR and similar laws for high-risk processing activities. Learn what triggers a DPIA, how to conduct one, and how to document it properly."},
  {title:"ISO 27001:2022 — Key Changes From the 2013 Version",tag:"Article",date:"Jul 2025",icon:"📋",desc:"The 2022 revision of ISO 27001 introduced significant structural changes and 11 new controls. Here's what you need to update if you're already certified or pursuing certification."},
  {title:"Penetration Testing vs Vulnerability Scanning: Key Differences",tag:"Guide",date:"Jun 2025",icon:"🎯",desc:"These are often confused but serve very different purposes. We clarify the differences, when to use each, and what to expect from a professional VAPT engagement."},
  {title:"EU AI Act: Compliance Requirements for High-Risk AI Systems",tag:"News",date:"May 2025",icon:"🇪🇺",desc:"The EU AI Act is now law. We explain the risk classification system, what 'high-risk AI' means, and the compliance obligations for developers and deployers."},
];

const tags = ["All","Article","Guide","News","Resource"];

export default function KnowledgeCentre({ navigate }) {
  const [activeTag, setActiveTag] = useState("All");
  const filtered = activeTag==="All" ? articles : articles.filter(a => a.tag===activeTag);

  return (
    <div>
      <section className="bg-[#0d1b2a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#f5a623] font-semibold uppercase tracking-widest text-sm mb-3">Resources & Insights</p>
          <h1 className="text-5xl font-black mb-6">Knowledge Centre</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">Stay ahead of cyber threats, regulatory changes, and governance best practices with our expert guides and articles.</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tags.map(tag => (
              <button key={tag} onClick={() => setActiveTag(tag)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${activeTag===tag?"bg-[#f5a623] text-white":"bg-white border border-gray-200 text-gray-600 hover:border-[#f5a623] hover:text-[#f5a623]"}`}>{tag}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a,i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <div className="h-44 bg-gradient-to-br from-[#0d1b2a] to-[#1a2f45] flex items-center justify-center">
                  <span className="text-6xl">{a.icon}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-[#fff8ec] text-[#f5a623] font-semibold px-3 py-1 rounded-full border border-[#f5a62330]">{a.tag}</span>
                    <span className="text-xs text-gray-400">{a.date}</span>
                  </div>
                  <h3 className="font-bold text-[#0d1b2a] mb-2 group-hover:text-[#f5a623] transition-colors leading-snug">{a.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{a.desc}</p>
                  <p className="text-[#f5a623] text-sm font-semibold mt-4">Read more →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeader title="Stay Informed" subtitle="Newsletter" />
          <p className="text-gray-600 mb-8">Get the latest cybersecurity news, compliance updates, and governance best practices delivered to your inbox.</p>
          <div className="flex max-w-md mx-auto gap-3">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#f5a623] transition-colors text-sm"/>
            <button className="bg-[#f5a623] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e09415] transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
