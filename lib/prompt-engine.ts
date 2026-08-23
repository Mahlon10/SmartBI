export function buildPrompt(
  context: string,
  question: string
): Array<{
  role: "system" | "user" | "assistant";
  content: string;
}> {

return [
{
role:"system",
content:
`You are the AI assistant for Eke Perfect Cleaning and Fumigation Services.

Answer only using the company information provided.
If the answer is not available, politely say you do not have that information.

Company information:
${context}`
},

{
role:"user",
content:question
}

];

}