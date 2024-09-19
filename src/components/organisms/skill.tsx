import * as React from 'react';
import { userSkills, skill } from '../../types/userProfile'

export const Skill = (props: userSkills) => {
  const { skills } = props;

  React.useEffect(() => {
    console.log(skills);
  }, [skills]);

  return (
    <>
      <ul>
        {skills.map((skill: skill) => (
          <li key={skill.skills.id}>{skill.skills.name}</li>
        ))}
      </ul>
    </>
  );
};