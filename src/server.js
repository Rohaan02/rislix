import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import emailRoutes from "./routes/emailRoutes.js";

if (process.env.NODE_ENV !== "production") dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));

// API Routes
app.use("/api", emailRoutes);

// For any other routes, serve index.html (client-side routing)
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith("/api/")) {
    return next();
  }

  // Send index.html for all non-API routes
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Serving static files from: ${publicPath}`);
  console.log(`📧 API endpoints: http://localhost:${PORT}/api/`);
  console.log(`🌐 Frontend: http://localhost:${PORT}/`);
});
