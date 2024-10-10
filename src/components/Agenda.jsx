import { useEffect, useState } from "react";
import { Filter } from "./Filter";
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";
import agendaService from "../services/agenda";
import { Notification } from "./Notification";

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
  const [message, setMessage] = useState(null);
  const [typeMessage, setTypeMessage] = useState("success");

  useEffect(() => {
    agendaService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={typeMessage} />
      <Filter search={search} setSearch={setSearch} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setTypeMessage={setTypeMessage}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} search={search} />
    </div>
  );
};
