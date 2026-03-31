import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import emailRoutes from "./routes/emailRoutes.js";

const app = express();

// Needed because you're using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/api", emailRoutes);

// Serve React build — __dirname is src/, so public is one level up
app.use(express.static(path.join(__dirname, "../public")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public", "index.html"));
// });
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;
