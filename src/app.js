import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import emailRoutes from "./routes/emailRoutes.js";

const app = express();

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🚀 Rislix Backend API is running...");
});

app.use("/api", emailRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
