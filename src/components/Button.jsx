export default function Button({ children, variant = "primary", onClick, className = "", size = "md" }) {
  const base = "font-semibold rounded-full transition-all duration-200 inline-flex items-center justify-center gap-2";
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" };
  const variants = {
    primary: "bg-[#00d4ff] text-white hover:bg-[#00b8d9] shadow-md hover:shadow-lg",
    outline: "border-2 border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-white",
    dark: "bg-[#1a1a2e] text-white hover:bg-[#0d0d1a]",
    white: "bg-white text-[#1a1a2e] hover:bg-gray-100 shadow-md",
  };
  return <button onClick={onClick} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>{children}</button>;
}
