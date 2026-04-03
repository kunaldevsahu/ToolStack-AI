// API routes for generate endpoints
import express from "express";
import { generateText } from "../controllers/generateController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, generateText);

export default router;