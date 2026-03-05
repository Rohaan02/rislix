const stats = [
  { value: "200+", label: "Projects Delivered" },
  { value: "50+", label: "Expert Engineers" },
  { value: "30+", label: "Countries Served" },
  { value: "8+", label: "Years of Excellence" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function StatsBar() {
  return (
    <section className="py-16 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="heading-font text-4xl font-extrabold gradient-text mb-1">{s.value}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
