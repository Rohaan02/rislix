export default function Button({ children, variant = "primary", onClick, className = "", size = "md" }) {
  const base = "font-bold rounded-lg transition-all duration-200 inline-flex items-center justify-center gap-2";
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" };
  const variants = {
    primary: "bg-[#16a34a] text-white hover:bg-[#15803d] shadow-md hover:shadow-lg",
    outline: "border-2 border-[#16a34a] text-[#16a34a] hover:bg-[#16a34a] hover:text-white",
    dark: "bg-[#0f172a] text-white hover:bg-black",
    white: "bg-white text-[#0f172a] hover:bg-gray-100 shadow-md",
    blue: "bg-[#1e3a8a] text-white hover:bg-[#1d4ed8]",
  };
  return (
    <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant] || ""} ${className}`}>
      {children}
    </button>
  );
}
