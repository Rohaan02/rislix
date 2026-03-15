// Updated to use image from assets instead of SVG

export default function RislixLogo({
  size = 48,
  showText = true,
  textSize = "lg",
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Image from assets */}
      <img
        src="/assets/RislixCyberSecurityLogo-removebg.png"
        alt="Rislix Cyber Security Logo"
        width={size}
        height={size * 1.1}
        className="object-contain"
        style={{
          width: size,
          height: size * 1.1,
        }}
      />

      {/* Wordmark: RISL in navy, IX in green */}
      {showText && (
        <div className="flex flex-col leading-none text-left">
          {/* Added text-left here */}
          <div
            className={`font-black tracking-widest uppercase ${
              textSize === "lg"
                ? "text-2xl"
                : textSize === "sm"
                ? "text-base"
                : "text-xl"
            }`}
          >
            <span className="text-[#1e3a8a]">RISL</span>
            <span className="text-[#16a34a]">IX</span>
          </div>
          <span className="text-black font-medium text-[9px] tracking-[0.2em] uppercase mt-0.5">
            Information Security Consultancy
          </span>
        </div>
      )}
    </div>
  );
}
