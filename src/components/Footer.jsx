const footerLinks = {
  Services: ["Web Development", "Mobile Apps", "Cloud Solutions", "AI & ML", "UI/UX Design", "QA Testing"],
  Company: ["About Us", "Portfolio", "Careers", "Blog", "Press Kit", "Contact"],
  Technologies: ["React & Next.js", "Node.js & Python", "AWS & Azure", "React Native", "Flutter"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const socials = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Twitter", href: "#", icon: "𝕏" },
  { label: "GitHub", href: "#", icon: "⌥" },
  { label: "Dribbble", href: "#", icon: "◉" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center font-black text-white text-lg heading-font">V</div>
              <span className="text-xl font-bold heading-font text-white">Vaival</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">
              Building world-class digital products for startups and enterprises since 2016. Your vision, our expertise.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="w-9 h-9 bg-white/[0.04] border border-white/8 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/40 transition text-sm font-bold">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-divider mb-8"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div>© 2024 Vaival Technologies. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Made with <span className="text-red-400 mx-1">♥</span> in Lahore, Pakistan
          </div>
        </div>
      </div>
    </footer>
  );
}
