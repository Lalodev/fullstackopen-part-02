import { useRef } from "react";
import agendaService from "../services/agenda";

export const PersonForm = ({
  persons,
  setPersons,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  const contactRef = useRef();

  const handleNameAgenda = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberAgenda = (event) => {
    setNewNumber(event.target.value);
  };

  const findAPerson = (name) => {
    return persons.find((person) => person.name === name);
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (!findAPerson(newName)) {
      const newPerson = { name: newName, number: newNumber };

      agendaService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        contactRef.current.focus();
      });
    } else {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirm) {
        const person = findAPerson(newName);
        const changedPerson = { ...person, number: newNumber };

        const { id } = person;

        agendaService.update(id, changedPerson).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          );
        });

        setNewName("");
        setNewNumber("");
        contactRef.current.focus();
      }

      contactRef.current.focus();
    } //else
  };

  return (
    <form onSubmit={handleAddPerson}>
      <div>
        Name:
        <input ref={contactRef} value={newName} onChange={handleNameAgenda} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberAgenda} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
