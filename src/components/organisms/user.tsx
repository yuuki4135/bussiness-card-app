import * as React from 'react' 
import { Skill } from './skil';
import { fetchUserData } from '../../model/user';

type UserProps = {
  id: string;
};

export const User = (props: UserProps) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<Database["public"]["Tables"]["user"] | null>(null);
  const [skills, setSkills] = React.useState<Database["public"]["Tables"]["skills"] | null>(null);
  const { id } = props;

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("user")
        .select(`*, user_skill(
          skills(*)
        )`)
        .eq("user_id", id)
        .single();

      if (error) {
        console.error(error);
      }
      if (!error) {
        setUser(data);
        setSkills(data?.user_skill);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{user?.name}</h2>
          <p>{user?.despriction}</p>
          <p>GitHub: {user?.github_id}</p>
          <p>Qiita: {user?.qiita_id}</p>
          <p>
            <Skill skills={skills} />
          </p>
        </>
      )}
    </>
  )
}