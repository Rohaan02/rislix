export default function ServiceCard({ icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-r from-[#1e3a8a] to-[#16a34a] text-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-green-200 group hover:-translate-y-1"
    >
      <div className="w-14 h-14 bg-[#f0fdf4] rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:bg-[#16a34a] transition-colors">
        <span className="group-hover:text-white transition-colors">{icon}</span>
      </div>
      <h3 className="font-bold text-lg text-[#0f172a] mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
      )}
      <div className="mt-4 text-[#16a34a] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
        Find out more →
      </div>
    </div>
  );
}
