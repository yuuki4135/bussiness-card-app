import * as React from 'react'
import { useUsers } from '../../hooks/useUsers';
import { Skill } from './skill'

type UserInfoProps = {
  user_id: string;
};

export const UserInfo = (props: UserInfoProps) => {
  const { user_id } = props;
  const { loading, users, skills, findUser } = useUsers();

  React.useEffect(() => {
    findUser(user_id);
  }, [user_id]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{users?.name}</h2>
          <p>{users?.description}</p>
          <a href={users?.github_url}>
            <p>
              GitHub: {users?.github_id}
            </p>
          </a>
          <a href={users?.qiita_url}>
            <p>
              Qiita: {users?.qiita_id}
            </p>
          </a>
          <a href={users?.x_url}>
            <p>
              x: {users?.x_id}
            </p>
          </a>
          <p>
            <Skill skills={skills!} />
          </p>
        </>
      )}
    </>
  )
}