import { useState, useEffect } from "react";
import { Note } from "./Note";
import noteService from "../services/notes";

import { Notification } from "./Notification";
import { Footer } from "./Footer";

export const Notes = (/*{ notesdb }*/) => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    //console.log("effect");
    // axios.get("http://localhost:3001/notes").then((response) => {
    //   console.log("promise fulfilled");
    //   setNotes(response.data);
    // });

    // noteService.getAll().then((response) => {
    //   setNotes(response.data);
    // });

    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  // no renderizar nada si notes aún es null
  if (!notes) {
    return null;
  }

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      //id: notes.length + 1,
    };

    // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    //   //console.log(response);
    //   setNotes(notes.concat(response.data));
    //   setNewNote("");
    // });

    // noteService.create(noteObject).then((response) => {
    //   setNotes(notes.concat(response.data));
    //   setNewNote("");

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    //console.log(`importance of ${id} needs to be toggled`);
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });

    // noteService.update(id, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        //alert(`the note '${note.content}' was already deleted from server`);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {/* {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))} */}
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  );
};

// useEffect(() => {
//   console.log("effect");
//   axios.get("http://localhost:3001/notes").then((response) => {
//     console.log("promise fulfilled");
//     setNotes(response.data);
//   });
// }, []);
//console.log("render", notes.length, "notes");

// const hook = () => {
//   console.log("effect");
//   axios.get("http://localhost:3001/notes").then((response) => {
//     console.log("promise fulfilled");
//     setNotes(response.data);
//   });
// };
// useEffect(hook, []);

// useEffect(() => {
//   console.log("effect");

//   const eventHandler = (response) => {
//     console.log("promise fulfilled");
//     setNotes(response.data);
//   };

//   const promise = axios.get("http://localhost:3001/notes");
//   promise.then(eventHandler);
// }, []);
