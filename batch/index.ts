import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/schema";

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);

const deleteTheDayBeforeCreateData = async () => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  yesterday.setHours(0, 0, 0, 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const { data, error } = await supabase
    .from("user")
    .delete()
    .gte('created_at', yesterday.toISOString())
    .lt('created_at', today.toISOString())
    .select()
  if (error) {
    console.error(error);
    throw new Error("Failed to delete user data");
  }
  console.log('Deleted data:', data)
}

deleteTheDayBeforeCreateData()
