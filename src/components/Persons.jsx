import { Person } from "./Person";

export const Persons = ({ persons, setPersons, search }) => {
  const personsToShow = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          <Person
            id={person.id}
            name={person.name}
            number={person.number}
            persons={persons}
            setPersons={setPersons}
          />
        </li>
      ))}
    </ul>
  );
};
