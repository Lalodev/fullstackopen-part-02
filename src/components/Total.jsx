export const Total = ({ parts }) => {
  //console.log(parts);

  const total = parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return (
    <p>
      <b>{`Total of ${total} exercises`}</b>
    </p>
  );
};
