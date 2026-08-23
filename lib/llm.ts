import { callOllama } from "./ollama";
import { callOpenRouter } from "./openrouter";


export async function callLLM(messages:any[]) {

  const provider = process.env.LLM_PROVIDER;

  console.log("Current LLM Provider:", provider);


  if(provider === "ollama") {

    console.log("Using Ollama qwen2.5:3b");

    return callOllama(messages);

  }


  if(provider === "openrouter") {

    console.log("Using OpenRouter Google Gemma");

    return callOpenRouter(messages);

  }


  throw new Error(
    "LLM provider not configured"
  );

}