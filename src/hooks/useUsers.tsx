import * as React from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../schema";
import { UserProfile } from "../types/userProfile";

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);

export const useUsers = () => {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<UserProfile>();
  const [skills, setSkills] = React.useState([]);
  const [error, setError] = React.useState(null);

  const findUser = async (user_id: string) => {
    const { data, error } = await supabase
      .from("user")
      .select(`*, user_skill(
        skills(*)
      )`)
      .eq("user_id", user_id)
      .single();
    if (error) {
      console.error(error);
      throw new Error("Failed to fetch user data");
    } else {
      setUsers({
        user_id: data.user_id,
        name: data.name,
        description: data.description,
        github_id: data.github_id ?? "",
        qiita_id: data.qiita_id ?? "",
        x_id: data.x_id ?? ""
      });
      setSkills(data.user_skill);
    }
  }

  return { loading, users, skills, error, findUser };
};