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
  origin: "https://your-vercel-app.vercel.app",
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