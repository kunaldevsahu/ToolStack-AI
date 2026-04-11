import { getPrompt } from "../prompts/index.js";
import { generateWithAI } from "../services/aiService.js";
import History from "../models/History.js";

export const generateText = async (req, res) => {
  try {
    const { tool, input, tone } = req.body;

    if (!tool || !input) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const prompt = getPrompt(tool, input, tone);

    const result = await generateWithAI(prompt);

    // Save to history
    await History.create({
      userId: req.user._id,
      tool,
      input,
      output: result,
      tone: tone || "Neutral",
    });

    res.json({ result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};