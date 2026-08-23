import { callLLM } from "./llm";

console.log("ROUTER FILE LOADED");


export async function runLLM(
  messages:Array<{
    role:"system"|"user"|"assistant";
    content:string;
  }>
){

  console.log("RUNLLM FUNCTION CALLED");

  return await callLLM(messages);

}