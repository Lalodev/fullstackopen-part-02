import agendaService from "../services/agenda";

export const Person = ({ id, name, number, persons, setPersons }) => {
  const handlePersonDelete = (id) => {
    // console.log(id);
    const confirm = window.confirm(`Delete ${name}?`);

    if (confirm) {
      agendaService.erase(id).then((returnedPerson) => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      {name} {number}{" "}
      <button onClick={() => handlePersonDelete(id)}>delete</button>
    </div>
  );
};
