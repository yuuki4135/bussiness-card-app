import * as React from 'react';
import { userSkills } from '../../types/userProfile'

export const Skill = (props: {skills: userSkills[]}) => {
  const { skills } = props;

  React.useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <>
      {skills.map((skill: userSkills) => (
        <div key={skill?.skills?.id}>
          {skill?.skills?.name}
        </div>
      ))}
    </>
  );
};