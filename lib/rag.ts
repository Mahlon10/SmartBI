import { supabase } from "./supabase";

export async function getBusinessContext(question: string) {
  const { data, error } = await supabase
    .from("eke_perfect")
    .select("*");

  if (error) {
    throw error;
  }

  return data
    .map(
      (item) =>
        `Category: ${item.category}
Title: ${item.title}
Content: ${item.content}`
    )
    .join("\n\n");
}