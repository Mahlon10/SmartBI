export async function callOllama(
  messages: Array<{
    role: "system" | "user" | "assistant";
    content:string;
  }>
){

const response = await fetch(
 "http://localhost:11434/api/chat",
 {
  method:"POST",
  headers:{
   "Content-Type":"application/json"
  },
  body:JSON.stringify({

    model:"qwen2.5:3b",

    messages,

    stream:false

  })
 }
);


const data = await response.json();


return data.message.content;

}