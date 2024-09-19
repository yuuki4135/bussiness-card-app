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
};

export type skill = {
  id: number;
  name: string;
}

export type userSkills = {
  skills: skill[];
}[]