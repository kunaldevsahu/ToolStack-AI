import humanizer from "./humanizer.js";
import summarizer from "./summarizer.js";
import rewriter from "./rewriter.js";
import email from "./email.js";
import explain from "./explain.js";
import keyword from "./keyword.js";
import codeConverter from "./codeConverter.js";
import jsonToCsv from "./jsonToCsv.js";

export const getPrompt = (tool, input, tone) => {
  switch (tool) {
    case "Humanizer":
      return humanizer(input);
    case "Summarizer":
      return summarizer(input);
    case "Rewriter":
      return rewriter(input, tone);
    case "Email Generator":
      return email(input);
    case "Explain Simple":
      return explain(input);
    case "Keyword Extractor":
      return keyword(input);
    case "Code Converter":
      return codeConverter(input, tone);
    case "JSON to CSV Converter":
      return jsonToCsv(input);
    default:
      throw new Error("Invalid tool");
  }
};