const values = [
  { icon: "🎯", title: "Client-First", desc: "Your goals drive every decision we make." },
  { icon: "⚡", title: "Speed + Quality", desc: "We never sacrifice quality for speed — we optimize both." },
  { icon: "🔒", title: "Transparency", desc: "Clear communication and honest timelines, always." },
  { icon: "🌱", title: "Long-term Partner", desc: "We grow with you beyond the first delivery." },
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left visual */}
        <div className="relative">
          <div className="bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 border border-white/8 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Founded", value: "2016", sub: "8+ years building" },
                { label: "Team Size", value: "50+", sub: "Global engineers" },
                { label: "Offices", value: "3", sub: "USA · UK · Pakistan" },
                { label: "Clients", value: "100+", sub: "Worldwide" },
              ].map((item) => (
                <div key={item.label} className="stat-card rounded-2xl p-5">
                  <div className="heading-font text-3xl font-extrabold gradient-text">{item.value}</div>
                  <div className="text-white font-medium text-sm mt-1">{item.label}</div>
                  <div className="text-gray-500 text-xs">{item.sub}</div>
                </div>
              ))}
            </div>
            <div className="bg-white/[0.03] border border-white/6 rounded-2xl p-5">
              <div className="text-sm text-gray-400 mb-3 font-medium">Client Satisfaction Score</div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/5 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full" style={{ width: "98%" }}></div>
                </div>
                <span className="text-white font-bold text-sm">98%</span>
              </div>
            </div>
          </div>
          {/* Decorative blur */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right content */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6">
            About Vaival
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Your Trusted <span className="gradient-text">Tech Partner</span> Since 2016
          </h2>
          <p className="text-gray-400 leading-relaxed mb-4">
            Vaival Technologies is a Pakistan-based, globally-operating software development company. We specialize in helping startups, scale-ups, and enterprises build digital products that are fast, scalable, and beautiful.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            Our team of 50+ engineers, designers, and project managers work across time zones to deliver results that matter. We've shipped over 200 products across fintech, healthtech, e-commerce, and more.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="flex items-start gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                <span className="text-2xl">{v.icon}</span>
                <div>
                  <div className="text-white font-semibold text-sm">{v.title}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
