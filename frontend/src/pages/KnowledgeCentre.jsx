import { Helmet } from "react-helmet-async";
import { useState } from "react";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import {
  Flag,
  Brain,
  Building2,
  Shield,
  CreditCard,
  Landmark,
  Lock,
  ClipboardList,
  Target,
  Globe,
  BookOpen,
  Newspaper,
  FileText,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Mail,
  Send,
  Search,
  Filter,
  Tag,
  Clock,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Award,
  Users,
  MessageCircle,
} from "lucide-react";

const articlesData = [
  {
    title: "Understanding the NCA ECC Framework for Saudi Organizations",
    tag: "Guide",
    date: "Feb 2026",
    icon: Flag,
    desc: "A comprehensive walkthrough of the NCA Essential Cybersecurity Controls, what each domain requires, and how to build your compliance program from scratch.",
  },
  {
    title: "ISO 42001: What the AI Management Standard Means for Your Business",
    tag: "Article",
    date: "Jan 2026",
    icon: Brain,
    desc: "ISO 42001 is the world's first AI management system standard. Here's what it covers, who needs it, and how to align your AI governance program.",
  },
  {
    title: "DORA Compliance: What Financial Firms Need to Know",
    tag: "News",
    date: "Dec 2025",
    icon: Building2,
    desc: "The EU's Digital Operational Resilience Act (DORA) came into force in January 2025. This guide explains the key requirements and how financial institutions should prepare.",
  },
  {
    title: "vCISO vs Full-Time CISO: Which Is Right for Your Organization?",
    tag: "Guide",
    date: "Nov 2025",
    icon: Shield,
    desc: "Should you hire a full-time CISO or engage a virtual CISO? We break down the cost, coverage, and capability differences to help you make the right choice.",
  },
  {
    title: "SAMA Cybersecurity Framework: A Practical Guide for KSA Banks",
    tag: "Guide",
    date: "Oct 2025",
    icon: CreditCard,
    desc: "The SAMA framework is mandatory for all financial institutions in Saudi Arabia. This guide walks through the domains, maturity levels, and how to pass your assessment.",
  },
  {
    title: "Qatar PDPPL Explained: What Businesses Need to Do Now",
    tag: "Article",
    date: "Sep 2025",
    icon: Landmark,
    desc: "Qatar's Personal Data Protection Law is now in force. We explain the key obligations, consent requirements, and how to build your compliance program.",
  },
  {
    title: "What Is a Data Protection Impact Assessment (DPIA)?",
    tag: "Guide",
    date: "Aug 2025",
    icon: Lock,
    desc: "DPIAs are required under GDPR and similar laws for high-risk processing activities. Learn what triggers a DPIA, how to conduct one, and how to document it properly.",
  },
  {
    title: "ISO 27001:2022 — Key Changes From the 2013 Version",
    tag: "Article",
    date: "Jul 2025",
    icon: ClipboardList,
    desc: "The 2022 revision of ISO 27001 introduced significant structural changes and 11 new controls. Here's what you need to update if you're already certified or pursuing certification.",
  },
  {
    title: "Penetration Testing vs Vulnerability Scanning: Key Differences",
    tag: "Guide",
    date: "Jun 2025",
    icon: Target,
    desc: "These are often confused but serve very different purposes. We clarify the differences, when to use each, and what to expect from a professional VAPT engagement.",
  },
  {
    title: "EU AI Act: Compliance Requirements for High-Risk AI Systems",
    tag: "News",
    date: "May 2025",
    icon: Globe,
    desc: "The EU AI Act is now law. We explain the risk classification system, what 'high-risk AI' means, and the compliance obligations for developers and deployers.",
  },
];

const tagsData = ["All", "Article", "Guide", "News", "Resource"];

export default function KnowledgeCentre({ navigate }) {
  const [activeTag, setActiveTag] = useState("All");
  const [email, setEmail] = useState("");

  const filtered =
    activeTag === "All"
      ? articlesData
      : articlesData.filter((article) => article.tag === activeTag);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Handle subscription logic here
      console.log("Subscribed with email:", email);
      setEmail("");
      alert("Thank you for subscribing!");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Knowledge Centre | RISLIX</title>
        <meta
          name="description"
          content="Explore the RISLIX Knowledge Centre for expert insights, guides, and news on cybersecurity compliance, risk management, and best practices to protect your business."
        />
      </Helmet>
      <section className="bg-[#0f172a] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#16a34a] font-semibold uppercase tracking-widest text-sm mb-3">
            Resources & Insights
          </p>
          <h1 className="text-5xl font-black mb-6">Knowledge Centre</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Stay ahead of cyber threats, regulatory changes, and governance best
            practices with our expert guides and articles.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {tagsData.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTag === tag
                    ? "bg-[#16a34a] text-white shadow-lg shadow-[#16a34a20]"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-[#16a34a] hover:text-[#16a34a] hover:shadow-md"
                }`}
              >
                {tag !== "All" && <Tag className="w-3 h-3" />}
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, index) => {
              const IconComponent = article.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/knowledge-centre/${article.title.toLowerCase().replace(/\s+/g, "-")}`,
                    )
                  }
                >
                  <div className="h-44 bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <IconComponent className="w-16 h-16 text-[#16a34a] transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs bg-[#f0fdf4] text-[#16a34a] font-semibold px-3 py-1 rounded-full border border-[#16a34a30] flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        {article.tag}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-[#0f172a] mb-2 group-hover:text-[#16a34a] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {article.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-[#16a34a] text-sm font-semibold group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500">
                No articles found for this category.
              </p>
              <button
                onClick={() => setActiveTag("All")}
                className="mt-4 text-[#16a34a] font-semibold hover:underline"
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionHeader title="Stay Informed" subtitle="Newsletter" />
          <p className="text-gray-600 mb-8">
            Get the latest cybersecurity news, compliance updates, and
            governance best practices delivered to your inbox.
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex max-w-md mx-auto gap-3"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a20] transition-colors text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#16a34a] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#15803d] transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
