export default function ServiceCard({ icon, title, description, onClick }) {
  return (
    <div onClick={onClick} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#00d4ff40] group hover:-translate-y-1">
      <div className="w-14 h-14 bg-[#f0fbff] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#00d4ff] transition-colors">
        <span className="text-2xl group-hover:text-white transition-colors">{icon}</span>
      </div>
      <h3 className="font-bold text-lg text-[#1a1a2e] mb-2">{title}</h3>
      {description && <p className="text-gray-500 text-sm leading-relaxed">{description}</p>}
      <div className="mt-4 text-[#00d4ff] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
        Find out more <span>→</span>
      </div>
    </div>
  );
}
