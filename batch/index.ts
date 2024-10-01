import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/schema";

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);

const deleteTheDayBeforeCreateData = async () => {
  const today = new Date();
  const todayJst = new Date(today.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
  todayJst.setDate(todayJst.getDate() - 1);
  const yesterdayJst = new Date(todayJst);
  yesterdayJst.setHours(0, 0, 0, 0)
  const yesterdayJstEnd = new Date(todayJst);
  yesterdayJstEnd.setHours(23, 59, 59, 999)
  
  const { data, error } = await supabase
    .from("user")
    .delete()
    .gte('created_at', yesterdayJst.toISOString())
    .lt('created_at', yesterdayJstEnd.toISOString())
    .select()
  if (error) {
    console.error(error);
    throw new Error("Failed to delete user data");
  }
  console.log('Deleted data:', data)
}

deleteTheDayBeforeCreateData()
