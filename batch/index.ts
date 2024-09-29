import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/schema";

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);

const deleteTheDayBeforeCreateData = async () => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
  const yesterdayJst = new Date(yesterday.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
  yesterdayJst.setHours(0, 0, 0, 0)

  const today = new Date()
  const todayJst = new Date(yesterday.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }));
  today.setHours(0, 0, 0, 0)
  const { data, error } = await supabase
    .from("user")
    .delete()
    .gte('created_at', yesterdayJst.toISOString())
    .lt('created_at', todayJst.toISOString())
    .select()
  if (error) {
    console.error(error);
    throw new Error("Failed to delete user data");
  }
  console.log('Deleted data:', data)
}

deleteTheDayBeforeCreateData()
