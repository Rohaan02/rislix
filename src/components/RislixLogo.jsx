// SVG recreation of the RISLIX shield logo - blue/green circuit board shield with X
export default function RislixLogo({
  size = 48,
  showText = true,
  textSize = "lg",
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Shield SVG Icon */}
      <svg
        width={size}
        height={size * 1.1}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield left half - dark blue */}
        <path
          d="M50 5 L10 20 L10 55 C10 78 30 97 50 105 L50 5Z"
          fill="url(#blueGrad)"
        />
        {/* Shield right half - green */}
        <path
          d="M50 5 L90 20 L90 55 C90 78 70 97 50 105 L50 5Z"
          fill="url(#greenGrad)"
        />

        {/* Circuit traces - left side blue */}
        <g stroke="#4a9eff" strokeWidth="1.2" fill="none" opacity="0.8">
          <line x1="20" y1="30" x2="35" y2="30" />
          <circle cx="19" cy="30" r="2" fill="#4a9eff" />
          <line x1="20" y1="40" x2="30" y2="40" />
          <circle cx="19" cy="40" r="2" fill="#4a9eff" />
          <line x1="15" y1="50" x2="32" y2="50" />
          <circle cx="14" cy="50" r="2" fill="#4a9eff" />
          <line x1="18" y1="62" x2="33" y2="62" />
          <circle cx="17" cy="62" r="2" fill="#4a9eff" />
          <line x1="22" y1="73" x2="35" y2="73" />
          <circle cx="21" cy="73" r="2" fill="#4a9eff" />
          <line x1="20" y1="30" x2="20" y2="50" />
          <line x1="15" y1="50" x2="15" y2="62" />
          <circle cx="35" cy="30" r="2.5" fill="none" stroke="#4a9eff" />
          <circle cx="30" cy="40" r="2.5" fill="none" stroke="#4a9eff" />
          <circle cx="33" cy="62" r="2.5" fill="none" stroke="#4a9eff" />
        </g>

        {/* Circuit traces - right side green */}
        <g stroke="#22c55e" strokeWidth="1.2" fill="none" opacity="0.8">
          <line x1="80" y1="30" x2="65" y2="30" />
          <circle cx="81" cy="30" r="2" fill="#22c55e" />
          <line x1="80" y1="42" x2="68" y2="42" />
          <circle cx="81" cy="42" r="2" fill="#22c55e" />
          <line x1="85" y1="52" x2="68" y2="52" />
          <circle cx="86" cy="52" r="2" fill="#22c55e" />
          <line x1="82" y1="63" x2="67" y2="63" />
          <circle cx="83" cy="63" r="2" fill="#22c55e" />
          <line x1="78" y1="74" x2="65" y2="74" />
          <circle cx="79" cy="74" r="2" fill="#22c55e" />
          <line x1="80" y1="30" x2="80" y2="52" />
          <line x1="85" y1="52" x2="85" y2="63" />
          <circle cx="65" cy="30" r="2.5" fill="none" stroke="#22c55e" />
          <circle cx="68" cy="42" r="2.5" fill="none" stroke="#22c55e" />
          <circle cx="67" cy="63" r="2.5" fill="none" stroke="#22c55e" />
        </g>

        {/* White X cross */}
        <line
          x1="28"
          y1="22"
          x2="72"
          y2="85"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <line
          x1="72"
          y1="22"
          x2="28"
          y2="85"
          stroke="white"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Center divider line */}
        <line
          x1="50"
          y1="5"
          x2="50"
          y2="105"
          stroke="white"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wordmark: RISL in navy, IX in green */}
      {showText && (
        <div className="flex flex-col leading-none">
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
          <span className="text-gray-400 font-medium text-[9px] tracking-[0.2em] uppercase mt-0.5">
            Cyber · Privacy · GRC
          </span>
        </div>
      )}
    </div>
  );
}
