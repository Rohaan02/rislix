export default function Footer({ navigate }) {
  return (
    <footer className="bg-[#0d1b2a] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <button onClick={() => navigate("home")} className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 rounded-full border-2 border-[#f5a623] opacity-25"></div>
                <div className="absolute inset-[4px] rounded-full border border-[#f5a623] opacity-55"></div>
                <div className="absolute inset-[8px] rounded-full bg-[#f5a623]"></div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-black text-lg tracking-widest">RISLIX</span>
                <span className="text-[#f5a623] text-[9px] tracking-[0.2em] uppercase">Cyber · Privacy · GRC</span>
              </div>
            </button>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">Enterprise-grade cybersecurity, compliance, and governance solutions for regulated organizations worldwide.</p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-[#ffffff10] rounded-full flex items-center justify-center hover:bg-[#f5a623] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#f5a623]">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[["Home","home"],["Pricing","pricing"],["About Us","about-us"],["What We Do","what-we-do"],["Who We Help","who-we-help"],["Contact","contact"],["Knowledge Centre","knowledge-centre"],["Case Studies","case-studies"]].map(([label,page]) => (
                <li key={page}><button onClick={() => navigate(page)} className="hover:text-[#f5a623] transition-colors">{label}</button></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#f5a623]">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["vCISO – Virtual CISO","vDPO – Virtual DPO","GRC & Compliance","Cybersecurity Assessments","VAPT Services","Security Architecture","Business Continuity","AI Governance","Managed Advisory"].map(s => (
                <li key={s}><button onClick={() => navigate("what-we-do")} className="hover:text-[#f5a623] transition-colors">{s}</button></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#f5a623]">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-[#f5a623] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
                <a href="mailto:info@rislix.com" className="hover:text-[#f5a623] transition-colors">info@rislix.com</a>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-[#f5a623] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
                <a href="tel:+442039304300" className="hover:text-[#f5a623] transition-colors">+44 203 9304300</a>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-[#f5a623] shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                <span>167-169 Great Portland Street, 5th Floor, London, W1W 5PF</span>
              </div>
            </div>
            <div className="mt-6 bg-[#f5a62312] border border-[#f5a62325] rounded-xl p-4">
              <p className="text-xs text-[#f5a623] font-bold mb-2">FREE 30-MIN CONSULTATION</p>
              <a href="mailto:info@rislix.com" className="text-white font-semibold text-sm hover:text-[#f5a623] transition-colors">info@rislix.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#ffffff10] py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
          <span>Copyright © 2026 RISLIX. All rights reserved</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#f5a623] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#f5a623] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
