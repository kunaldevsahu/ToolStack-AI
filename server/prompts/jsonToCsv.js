export default (input) => `
You are a precise data conversion tool. Convert the following JSON data into a valid CSV format.
If the input is an array of objects, use the object keys as the CSV header.
If the input is a single object, use the keys as the header and the values as the single row.
Ensure the output is strictly the CSV formatted string. Do not include markdown blocks (e.g. \`\`\`csv), do not add any conversational text or explanations.

JSON Data to convert:
${input}
`;
