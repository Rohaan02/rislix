export default function TopBar({ navigate }) {
  return (
    <div className="bg-[#1e3a8a] text-white text-sm py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="tel:+442039304300" className="flex items-center gap-1.5 font-semibold hover:text-[#4ade80] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            +44 203 9304300
          </a>
          <a href="mailto:info@rislix.com" className="flex items-center gap-1.5 font-semibold hover:text-[#4ade80] transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
            info@rislix.com
          </a>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {[["Case Studies","case-studies"],["About Us","about-us"],["Knowledge Centre","knowledge-centre"],["Contact","contact"]].map(([label,page]) => (
            <button key={page} onClick={() => navigate(page)} className="font-semibold text-blue-100 hover:text-[#4ade80] transition-colors">{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
