import * as React from 'react' 
import { Skill } from './skil';
import { User } from '../../model/user';

type UserProps = {
  id: string;
};

export const UserInfo = (props: UserProps) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState();
  const [skills, setSkills] = React.useState();
  const { id } = props;

  React.useEffect(() => {
    const user = new User();
    const data = user.find(id);
    setUser(data);
    setSkills(data?.user_skill);
    setLoading(false);
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