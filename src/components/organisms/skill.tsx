import * as React from 'react';
import { userSkills } from '../../types/userProfile'

export const Skill = (props: {skills: userSkills[]}) => {
  const { skills } = props;

  return (
    <>
      {skills.map((skill: userSkills) => (
        <div key={skill?.skills?.id} data-testid='skill'>
          {skill?.skills?.name}
        </div>
      ))}
    </>
  );
};