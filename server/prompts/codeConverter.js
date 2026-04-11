export default (input, targetLanguage) => `
You are an expert programmer. Convert the following code into ${targetLanguage || 'the requested language'}.
Ensure the logic, structure, and intent remain the same. Optimize the syntax for the target language where appropriate.
Do not include any conversational text or explanation. Only return the converted code.

Code to convert:
${input}
`;
