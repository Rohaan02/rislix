import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export default function TestimonialCard({ quote, name, role, company }) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-[#16a34a]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-gray-600 leading-relaxed mb-6 italic">
        "{quote}"
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#1e3a8a] to-[#16a34a] rounded-lg flex items-center justify-center text-white font-bold">
          <AccountCircleIcon style={{ fontSize: 24, color: "white" }} />
        </div>
        <div>
          <p className="font-semibold text-[#0f172a]">{name}</p>
          <p className="text-sm text-gray-500">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}
