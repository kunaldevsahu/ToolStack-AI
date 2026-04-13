export default (input, tone) => `
You are a highly capable AI assistant responding to a user's prompt. 
Please read the user's prompt below and answer it directly, conversationally, and accurately. 
Adopt a ${tone} tone in your response. Do not act like a system prompt; interact naturally as an intelligent chatbot answering the query.

User's prompt:
${input}
`;
