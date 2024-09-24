import * as React from "react";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../schema";
import { UserProfile, userSkills, skill } from "../types/userProfile";

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);

export const useUsers = () => {
  const [loading, setLoading] = React.useState(true);
  const [users, setUsers] = React.useState<UserProfile>();
  const [skills, setSkills] = React.useState<userSkills[]>();
  const [skillKinds, setSkillKinds] = React.useState<skill[]>();

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
        github_id: data.github_id ?? '',
        qiita_id: data.qiita_id ?? "",
        x_id: data.x_id ?? "",
        github_url: githubURL(data.github_id ?? ''),
        qiita_url: qiitaURL(data.qiita_id ?? ''),
        x_url: x_url(data.x_id ?? '')
      });
      setLoading(false);
      console.log(data.user_skill)
      setSkills(data.user_skill);
    }
  }

  const selectSkillKinds = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select(`*`);
    if (error) {
      console.error(error);
      throw new Error("Failed to fetch skill data");
    } else {
      setLoading(false);
      setSkillKinds(data)
    }
  }

  const githubURL = (id: string) => {
    return `https://github.com/${id}`
  }

  const qiitaURL = (id: string) => {
    return `https://qiita.com/${id}`
  }

  const x_url = (id: string) => {
    return `https://x.com/${id}`
  }

  return { loading, users, skills, skillKinds, findUser, selectSkillKinds };
};