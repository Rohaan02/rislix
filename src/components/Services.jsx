const services = [
  {
    icon: "🌐",
    title: "Web Development",
    desc: "Scalable, high-performance web applications built with modern frameworks like React, Next.js, Vue, and Node.js.",
    tags: ["React", "Next.js", "Node.js"],
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps for iOS and Android using React Native, Flutter, and Swift.",
    tags: ["React Native", "Flutter", "iOS"],
  },
  {
    icon: "☁️",
    title: "Cloud Solutions",
    desc: "Cloud architecture, DevOps, and infrastructure management on AWS, Azure, and Google Cloud Platform.",
    tags: ["AWS", "Azure", "GCP"],
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    desc: "Intelligent systems, NLP, computer vision, and predictive analytics integrated into your products.",
    tags: ["Python", "TensorFlow", "OpenAI"],
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "User-centered design that blends aesthetics with functionality to deliver exceptional digital experiences.",
    tags: ["Figma", "Prototyping", "Research"],
  },
  {
    icon: "🔗",
    title: "API & Integrations",
    desc: "Seamless third-party integrations, RESTful APIs, GraphQL services, and microservices architecture.",
    tags: ["REST", "GraphQL", "Microservices"],
  },
  {
    icon: "🛡️",
    title: "QA & Testing",
    desc: "Comprehensive quality assurance including manual testing, automation, and performance testing.",
    tags: ["Selenium", "Jest", "Cypress"],
  },
  {
    icon: "📊",
    title: "Data Engineering",
    desc: "Data pipelines, analytics dashboards, business intelligence, and big data processing at scale.",
    tags: ["Spark", "Kafka", "PostgreSQL"],
  },
];

function ServiceCard({ icon, title, desc, tags }) {
  return (
    <div className="card-hover group p-6 rounded-2xl bg-white/[0.03] border border-white/6 hover:border-indigo-500/30 cursor-pointer">
      <div className="service-icon-bg w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5">
        {icon}
      </div>
      <h3 className="heading-font text-lg font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-lg font-medium">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4">
            What We Do
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Services That <span className="gradient-text">Scale With You</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            From idea to deployment, we deliver end-to-end technology solutions tailored to your business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
