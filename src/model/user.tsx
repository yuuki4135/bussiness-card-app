import { createClient } from "@supabase/supabase-js";
import type { Database } from "../schema";

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);

type UserProps = {
  user_id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
  user_skill: { skills: string }[];
};

export class User {
  constructor(
    public user_id: string,
    public name: string,
    public description: string,
    public github_id: string,
    public qiita_id: string,
    public x_id: string,
    public user_skill: { skills: string }[]
  ) {
    this.user_id = user_id;
    this.name = name;
    this.description = description;
    this.github_id = github_id;
    this.qiita_id = qiita_id;
    this.x_id = x_id;
    this.user_skill = user_skill;
  }
  
  async find(user_id: string): Promise<User> {
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
    }
    return new User(
      data.user_id,
      data.name,
      data.description,
      data.github_id ?? "",
      data.qiita_id ?? "",
      data.x_id ?? "",
      data.user_skill
    );
  }
}
