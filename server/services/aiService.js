import OpenAI from "openai";

let client;

export const generateWithAI = async (prompt) => {
  try {
    if (!client) {
      console.log("Initializing OpenAI client with GROQ KEY:", !!process.env.GROQ_API_KEY);
      client = new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1", // ✅ Groq endpoint
      });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ fast + good
      messages: [
        {
          role: "system",
          content: "You are an expert AI writing assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Groq AI generation failed");
  }
};