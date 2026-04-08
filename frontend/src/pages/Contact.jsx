import { Helmet } from "react-helmet-async";
import ContactForm from "../components/ContactForm";
import SectionHeader from "../components/SectionHeader";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  AlertCircle,
  Send,
  MessageSquare,
  Users,
  Globe,
  CheckCircle,
  Shield,
  Lock,
  Headphones,
  Sparkles,
  Award,
  Zap,
  Star,
  Heart,
  ThumbsUp,
  HelpCircle,
  Info,
  Briefcase,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function Contact({ navigate }) {
  return (
    <div>
      <Helmet>
        <title>Contact Us | RISLIX</title>
        <meta
          name="description"
          content="Get in touch with RISLIX for enterprise-grade cybersecurity, compliance, and governance solutions."
        />
      </Helmet>
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
            Get in Touch
          </p>
          <h1 className="text-5xl font-black mb-6">Contact Us</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Still Confused About Our Services? For a free initial 30-minute
            consultancy, please get in touch.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <SectionHeader
              title="Send Us a Message"
              subtitle="Contact"
              centered={false}
            />
            <p className="text-gray-500 mb-8">
              Fill out the form and one of our cybersecurity experts will
              respond promptly — typically within one business day.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <ContactForm />
            </div>
          </div>
          <div>
            <SectionHeader
              title="Reach Us Directly"
              subtitle="Contact Info"
              centered={false}
            />
            <div className="space-y-5">
              {[
                {
                  icon: Mail,
                  label: "General Enquiries",
                  value: "info@rislix.com",
                  href: "mailto:info@rislix.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+44 7404 224899",
                  href: "tel:+447404224899",
                },
              ].map((contact, i) => {
                const IconComponent = contact.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-start gap-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 bg-[#f0fdf4] rounded-xl flex items-center justify-center shrink-0 border border-[#16a34a30]">
                      <IconComponent className="w-6 h-6 text-[#16a34a]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-1">
                        {contact.label}
                      </p>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="font-bold text-[#0f172a] hover:text-[#16a34a] transition-colors"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-[#0f172a] text-sm">
                          {contact.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-2xl p-8 mt-6 text-white">
              <h3 className="font-bold text-lg mb-4 text-[#16a34a] flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Business Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span className="text-[#16a34a] font-semibold">
                    9:00 AM – 6:00 PM GMT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>By appointment</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#ffffff15]">
                <div className="flex items-center gap-2 text-sm text-[#16a34a]">
                  <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-pulse"></div>
                  <Headphones className="w-4 h-4" />
                  Managed Advisory clients receive 24/7 support
                </div>
              </div>
            </div>

            <div className="bg-[#16a34a] rounded-2xl p-6 mt-5 text-white">
              <h3 className="font-black text-lg mb-1 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Free 30-Minute Consultation
              </h3>
              <p className="text-white/80 text-sm mb-3">
                Not sure where to start? Book a free no-obligation consultancy
                and we'll help you identify the right services for your needs.
              </p>
              <a
                href="mailto:info@rislix.com"
                className="font-black text-white text-lg hover:underline inline-flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                info@rislix.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0f172a] text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Need Urgent Assistance?</h2>
          <p className="text-gray-400 mb-6">
            If you've experienced a cyber incident or need urgent compliance
            guidance, contact us directly.
          </p>
          <a
            href="mailto:info@rislix.com"
            className="inline-flex items-center gap-2 bg-[#16a34a] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#15803d] transition-colors"
          >
            <Mail className="w-5 h-5" />
            info@rislix.com
          </a>
        </div>
      </section>
    </div>
  );
}
