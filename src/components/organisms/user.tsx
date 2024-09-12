import * as React from 'react' 
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../schema";
import { Skill } from './skil';

const supabase = createClient<Database>(
  process.env.VITE_SUPABASE_URL as string,
  process.env.VITE_SUPABASE_KEY as string
);

type UserProps = {
  id: string;
};

export const User = (props: UserProps) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<Database["public"]["Tables"]["user"] | null>(null);
  const { id } = props;

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", id)
        .single();

      if (!error) {
        setUser(data);
        setLoading(false);
        console.log(data);
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
          <Skill id={id} />
        </>
      )}
    </>
  )
}