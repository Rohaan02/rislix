export default function SectionHeader({ title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {subtitle && <p className={`text-sm font-semibold uppercase tracking-widest mb-2 ${light ? "text-[#00d4ff]" : "text-[#00d4ff]"}`}>{subtitle}</p>}
      <h2 className={`text-3xl md:text-4xl font-bold ${light ? "text-white" : "text-[#1a1a2e]"}`}>{title}</h2>
    </div>
  );
}
