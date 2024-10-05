import { useRef } from "react";

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
      setPersons([...persons, newPerson]);
      setNewName("");
      setNewNumber("");
      contactRef.current.focus();
    } else {
      alert(`${newName} is already added to phonebook`);
      contactRef.current.focus();
    }
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
