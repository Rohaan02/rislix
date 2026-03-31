export default function ProcessStep({ number, title, description, sub }) {
  return (
    <div className="flex gap-5 group">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl bg-[#16a34a] text-white flex items-center justify-center font-black text-lg shrink-0 shadow-lg group-hover:scale-110 transition-transform">
          {number}
        </div>
        <div className="flex-1 w-0.5 bg-gradient-to-b from-[#16a34a40] to-transparent mt-2"></div>
      </div>
      <div className="pb-8">
        <h3 className="font-bold text-xl text-[#0f172a] mb-1">{title}</h3>
        <p className="text-gray-500 text-sm mb-1">{description}</p>
        {sub && <p className="text-[#16a34a] text-sm font-semibold">{sub}</p>}
      </div>
    </div>
  );
}
