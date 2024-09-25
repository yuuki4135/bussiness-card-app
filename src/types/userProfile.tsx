export type UserProfile = {
  user_id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
  github_url: string;
  qiita_url: string;
  x_url: string;
} | undefined

export type skill = {
  id: number;
  name: string;
} | null

export type userSkills = {
  skills: skill
}

export type UserCreateInput = {
  user_id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
}

export type UserSkillCreateInput = {
  user_id: string;
  skill_id: number;
}
