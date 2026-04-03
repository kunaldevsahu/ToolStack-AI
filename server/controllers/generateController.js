import { getPrompt } from "../prompts/index.js";
import { generateWithAI } from "../services/aiService.js";

export const generateText = async (req, res) => {
  try {
    const { tool, input, tone } = req.body;

    if (!tool || !input) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    const prompt = getPrompt(tool, input, tone);

    const result = await generateWithAI(prompt);

    res.json({ result });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};