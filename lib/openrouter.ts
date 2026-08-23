export async function callOpenRouter(
  messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }>
) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",

      headers: {
        Authorization:
          `Bearer ${process.env.OPENROUTER_API_KEY}`,

        "Content-Type": "application/json",

        "HTTP-Referer":
          "http://localhost:3000",

        "X-Title":
          "Eke Perfect AI Assistant",
      },

      body: JSON.stringify({
        model:
          "openrouter/free",
        messages,

        temperature: 0.7,

        max_tokens: 500,
      }),
    }
  );


  const data = await response.json();


  console.log(
    "OpenRouter response:",
    data
  );


  if (!response.ok) {
    throw new Error(
      data.error?.message ||
      "OpenRouter failed"
    );
  }


  return data.choices[0].message.content;
}