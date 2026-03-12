export default function SectionHeader({ title, subtitle, centered = true, light = false }) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {subtitle && (
        <p className={`text-sm font-semibold uppercase tracking-widest mb-2 ${light ? "text-[#4ade80]" : "text-[#16a34a]"}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`text-3xl md:text-4xl font-black ${light ? "text-white" : "text-[#0f172a]"}`}>
        {title}
      </h2>
    </div>
  );
}
