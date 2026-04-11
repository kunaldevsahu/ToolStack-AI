// Entry point
// server.js
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import generateRoutes from "./routes/generateRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";





connectDB();

const app = express();
app.use(cors({
  origin: ["https://tool-stack-d4drfrcwg-kunals-projects-9cd1ad84.vercel.app","https://tool-stack-ai.vercel.app", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/generate", generateRoutes);
app.use("/api/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));