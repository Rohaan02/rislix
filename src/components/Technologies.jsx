const techStack = {
  Frontend: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Python", "Django", "Laravel", "Go", "Ruby on Rails"],
  Mobile: ["React Native", "Flutter", "Swift", "Kotlin", "Expo"],
  "Cloud & DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD"],
  Database: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch", "Firebase"],
  "AI / ML": ["Python", "TensorFlow", "PyTorch", "OpenAI API", "LangChain"],
};

export default function Technologies() {
  return (
    <section id="technologies" className="py-24 bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-medium mb-4">
            Our Tech Stack
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Built With <span className="gradient-text">Modern Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            We leverage the best tools and frameworks to build future-proof digital solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(techStack).map(([category, techs]) => (
            <div key={category} className="bg-white/[0.02] border border-white/6 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-widest text-indigo-300">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {techs.map((t) => (
                  <span key={t} className="tech-badge px-3 py-1.5 rounded-lg text-sm text-gray-300 font-medium cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
