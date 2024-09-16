import * as React from 'react';

type SkillProps = {
  skills: {skills: string}[]; // Assuming the skills array contains strings, replace `string` with the appropriate type if needed
};

export const Skill = (props: SkillProps) => {
  const { skills } = props;

  React.useEffect(() => {
    console.log(skills);
  }, [skills]);

  return (
    <>
      <h2>Skill</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill.skills.id}>{skill.skills.name}</li>
        ))}
      </ul>
    </>
  );
};