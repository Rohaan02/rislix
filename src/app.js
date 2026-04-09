import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import emailRoutes from "./routes/emailRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://rislix.com",
      "https://www.rislix.com",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);

// ✅ Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ API routes FIRST
app.use("/api", emailRoutes);

// Optional API check
app.get("/api", (req, res) => {
  res.json({ message: "🚀 API is running..." });
});

// ✅ Serve frontend (build/public)
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// ✅ SPA fallback (IMPORTANT FIX for Express v5)
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(publicPath, "index.html"));
});

// ✅ 404 (only for API or unknown routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${publicPath}`);
  console.log(`📧 API: http://localhost:${PORT}/api`);
});
