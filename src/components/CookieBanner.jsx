import { useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e] text-white p-4 shadow-2xl z-50 border-t border-[#00d4ff40]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold mb-1">We value your privacy</p>
          <p className="text-sm text-gray-300">We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={() => setVisible(false)} className="px-5 py-2 text-sm border border-gray-500 rounded-full hover:border-gray-300 transition-colors">Deny</button>
          <button onClick={() => setVisible(false)} className="px-5 py-2 text-sm bg-[#00d4ff] text-white rounded-full hover:bg-[#00b8d9] transition-colors font-semibold">OK</button>
        </div>
      </div>
    </div>
  );
}
