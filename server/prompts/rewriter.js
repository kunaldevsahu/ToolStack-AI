// Rewriter prompt
export default (input, tone) => `
Rewrite the following text in a ${tone} tone:

${input}
`;