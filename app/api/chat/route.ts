import { runLLM } from "@/lib/router";
import { getBusinessContext } from "@/lib/rag";
import { buildPrompt } from "@/lib/prompt-engine";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 1. Get business knowledge
    const context = await getBusinessContext(message);

    // 2. Build prompt
    const messages = buildPrompt(context, message);

    // 3. Run LLM
    const reply = await runLLM(messages);

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}