import { useState, useEffect, useRef } from "react";

function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

export default function StatCard({ number, suffix = "%", label }) {
  const [count, ref] = useCountUp(number);
  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-5xl font-black text-[#16a34a] mb-1">{count}<span className="text-3xl">{suffix}</span></div>
      <p className="text-gray-600 text-sm mt-2">{label}</p>
    </div>
  );
}
