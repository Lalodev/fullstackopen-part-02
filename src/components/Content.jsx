import { Part } from "./Part";

export const Content = ({ parts }) => {
  //console.log(parts);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};
