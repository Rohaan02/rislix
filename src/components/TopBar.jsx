import {
  Phone,
  Mail,
  BookOpen,
  Users,
  GraduationCap,
  Mail as MailIcon,
  PhoneCall,
} from "lucide-react";

export default function TopBar({ navigate }) {
  return (
    <div className="bg-[#1e3a8a] text-white text-sm py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a
            href="tel:+447404224899"
            className="flex items-center gap-1.5 font-semibold hover:text-[#4ade80] transition-colors group"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            +44 7404 224899
          </a>
          <a
            href="mailto:info@rislix.com"
            className="flex items-center gap-1.5 font-semibold hover:text-[#4ade80] transition-colors group"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            info@rislix.com
          </a>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Case Studies", page: "case-studies", icon: BookOpen },
            { label: "About Us", page: "about-us", icon: Users },
            {
              label: "Knowledge Centre",
              page: "knowledge-centre",
              icon: GraduationCap,
            },
            { label: "Contact", page: "contact", icon: MailIcon },
          ].map(({ label, page, icon: Icon }) => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className="flex items-center gap-1.5 font-semibold text-blue-100 hover:text-[#4ade80] transition-colors group"
            >
              <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
