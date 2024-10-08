import { useEffect, useRef, useState } from "react";
import { Filter } from "./Filter";
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";
import axios from "axios";

// const dataTest = [
//   { name: "Arto Hellas", number: "040-123456", id: 1 },
//   { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
//   { name: "Dan Abramov", number: "12-43-234345", id: 3 },
//   { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
// ];

export const Agenda = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => {
      // console.log(res.data);
      setPersons(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  );
};
