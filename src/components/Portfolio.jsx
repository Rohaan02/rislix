const projects = [
  {
    title: "FinTech Dashboard",
    category: "Web Application",
    desc: "A comprehensive financial analytics platform with real-time data visualization for institutional investors.",
    tags: ["React", "Node.js", "AWS"],
    gradient: "from-indigo-600/30 to-purple-600/20",
    accent: "#4F46E5",
  },
  {
    title: "HealthCare Mobile App",
    category: "Mobile Development",
    desc: "Cross-platform telemedicine app connecting patients with doctors for virtual consultations.",
    tags: ["React Native", "Firebase", "WebRTC"],
    gradient: "from-cyan-600/30 to-blue-600/20",
    accent: "#06B6D4",
  },
  {
    title: "E-Commerce Platform",
    category: "Full-Stack",
    desc: "High-traffic online marketplace supporting 100k+ concurrent users with AI-driven recommendations.",
    tags: ["Next.js", "PostgreSQL", "Redis"],
    gradient: "from-emerald-600/30 to-teal-600/20",
    accent: "#10B981",
  },
  {
    title: "AI Content Tool",
    category: "AI Integration",
    desc: "SaaS platform for content creators powered by GPT-4 with custom fine-tuned models.",
    tags: ["Python", "OpenAI", "React"],
    gradient: "from-orange-600/30 to-red-600/20",
    accent: "#F97316",
  },
  {
    title: "Logistics Tracker",
    category: "Enterprise Software",
    desc: "Real-time fleet management and delivery tracking system with predictive ETA algorithms.",
    tags: ["Angular", "Go", "Kubernetes"],
    gradient: "from-violet-600/30 to-pink-600/20",
    accent: "#8B5CF6",
  },
  {
    title: "EdTech Platform",
    category: "Web Application",
    desc: "Interactive learning management system with live video, quizzes, and progress analytics.",
    tags: ["Vue.js", "Django", "WebSocket"],
    gradient: "from-blue-600/30 to-indigo-600/20",
    accent: "#3B82F6",
  },
];

function ProjectCard({ title, category, desc, tags, gradient, accent }) {
  return (
    <div className={`card-hover group relative overflow-hidden rounded-2xl border border-white/6 bg-gradient-to-br ${gradient} p-6 cursor-pointer`}>
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ background: accent }}></div>
      <div className="relative">
        <span className="text-xs font-semibold uppercase tracking-widest mb-3 block" style={{ color: accent }}>
          {category}
        </span>
        <h3 className="heading-font text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span key={t} className="px-2 py-1 bg-white/5 border border-white/8 text-gray-300 text-xs rounded-lg">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium transition-colors" style={{ color: accent }}>
          View Case Study <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4">
            Our Portfolio
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Work That <span className="gradient-text">Speaks For Itself</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore our portfolio of digital products that have transformed businesses across industries.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
