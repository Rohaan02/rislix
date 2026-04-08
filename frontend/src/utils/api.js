export const getApiBaseUrl = () => {
  const currentUrl = window.location.hostname;

  // 🧪 Local development
  if (currentUrl.includes("localhost") || currentUrl.includes("127.0.0.1")) {
    return "http://localhost:3000"; // your backend port
  }

  // 🌐 Production (Rislix domain)
  if (currentUrl.includes("rislix.com")) {
    return "https://rislix.com"; // or your backend domain
  }

  // 🛑 Fallback
  return "https://rislix.com";
};

export const API_BASE_URL = getApiBaseUrl();
