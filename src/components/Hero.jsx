export default function Hero() {
  return (
    <section className="hero-bg min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pulse-glow pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pulse-glow pointer-events-none" style={{animationDelay:"1.5s"}}></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
            Top-Rated Software Development Company
          </div>

          <h1 className="heading-font text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
            We Build <span className="gradient-text">Digital Products</span> That Drive Growth
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
            Vaival Technologies is a full-service software development company delivering cutting-edge web, mobile, and cloud solutions to startups and enterprises worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a href="#contact" className="glow-btn px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-xl font-semibold text-white text-center">
              Start Your Project →
            </a>
            <a href="#portfolio" className="px-8 py-4 border border-white/10 rounded-xl font-semibold text-gray-300 hover:border-white/25 hover:text-white transition text-center">
              View Our Work
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-6 flex-wrap">
            {["Clutch Top 1000", "Google Partner", "AWS Partner", "ISO Certified"].map((b) => (
              <div key={b} className="tech-badge px-3 py-1.5 rounded-lg text-xs text-gray-400 font-medium">{b}</div>
            ))}
          </div>
        </div>

        {/* Right — Floating Visual */}
        <div className="relative flex items-center justify-center">
          <div className="float-anim w-full max-w-md">
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white heading-font">V</div>
                <div>
                  <div className="text-white font-semibold text-sm">Vaival Technologies</div>
                  <div className="text-gray-500 text-xs">Building your vision</div>
                </div>
                <div className="ml-auto flex items-center gap-1 bg-green-500/15 border border-green-500/25 px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-green-400 text-xs font-medium">Active</span>
                </div>
              </div>

              {/* Mock code snippet */}
              <div className="bg-black/40 rounded-xl p-4 font-mono text-xs mb-4">
                <div className="flex gap-1.5 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-400/70"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400/70"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400/70"></div>
                </div>
                <div className="text-indigo-400">const <span className="text-cyan-300">solution</span> = <span className="text-white">await</span></div>
                <div className="text-white pl-2">vaival.<span className="text-cyan-300">build</span>({"{"})</div>
                <div className="text-gray-400 pl-4">stack: <span className="text-green-300">'fullstack'</span>,</div>
                <div className="text-gray-400 pl-4">quality: <span className="text-green-300">'enterprise'</span>,</div>
                <div className="text-gray-400 pl-4">delivery: <span className="text-green-300">'ontime'</span></div>
                <div className="text-white pl-2">{"})"};</div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[["200+", "Projects"], ["50+", "Experts"], ["98%", "Satisfaction"]].map(([n, l]) => (
                  <div key={l} className="text-center bg-white/[0.03] rounded-xl p-3">
                    <div className="text-lg font-extrabold gradient-text heading-font">{n}</div>
                    <div className="text-xs text-gray-500">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-500/30">
              ⭐ 5.0 Rating
            </div>
            <div className="absolute -bottom-4 -left-4 bg-cyan-500/90 text-white px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg shadow-cyan-500/30">
              🚀 Fast Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
