const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "CTO, FinanceFlow Inc.",
    avatar: "SM",
    text: "Vaival delivered our trading platform on time and exceeded every expectation. Their engineering quality is top-notch — scalable, clean code with excellent documentation.",
    rating: 5,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "James Calloway",
    role: "CEO, MedBridge Health",
    avatar: "JC",
    text: "We launched our telemedicine app in record time thanks to Vaival's team. Their communication was flawless and the product quality genuinely surprised us.",
    rating: 5,
    color: "from-cyan-500 to-blue-500",
  },
  {
    name: "Aisha Rahman",
    role: "Product Manager, ShopNest",
    avatar: "AR",
    text: "Working with Vaival felt like having an in-house team. They understood our vision from day one and built a platform that's growing beyond our wildest projections.",
    rating: 5,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "Tom Erikson",
    role: "Founder, DataPulse",
    avatar: "TE",
    text: "The AI features Vaival built for us have completely transformed our product. The team is proactive, skilled, and genuinely invested in your success.",
    rating: 5,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Priya Nair",
    role: "VP Engineering, LogiTrack",
    avatar: "PN",
    text: "Vaival handled a complex microservices migration with zero downtime. Impressive expertise, great culture fit, and they delivered two weeks ahead of schedule.",
    rating: 5,
    color: "from-violet-500 to-pink-500",
  },
  {
    name: "Michael Osei",
    role: "Director, LearnSphere",
    avatar: "MO",
    text: "Vaival's team are true partners. They don't just execute tasks — they bring ideas that improve your product. Our EdTech platform is now used by 50,000+ students.",
    rating: 5,
    color: "from-blue-500 to-indigo-500",
  },
];

function TestimonialCard({ name, role, avatar, text, rating, color }) {
  return (
    <div className="testimonial-card rounded-2xl p-6 card-hover">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-5">"{text}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
          {avatar}
        </div>
        <div>
          <div className="text-white font-semibold text-sm">{name}</div>
          <div className="text-gray-500 text-xs">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-4">
            Client Stories
          </div>
          <h2 className="heading-font text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Trusted By <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Don't take our word for it — hear directly from the clients we've partnered with to build world-class software.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
