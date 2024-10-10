import { useState } from "react";

import { Course } from "./components/Course";
import { Note } from "./components/Note";
import { Notes } from "./components/Notes";
import { Agenda } from "./components/Agenda";

// const course = [
//   {
//     id: 1,
//     name: "Half Stack application development",
//     parts: [
//       {
//         name: "Fundamentals of React",
//         exercises: 10,
//         id: 1,
//       },
//       {
//         name: "Using props to pass data",
//         exercises: 7,
//         id: 2,
//       },
//       {
//         name: "State of a component",
//         exercises: 14,
//         id: 3,
//       },
//       {
//         name: "React",
//         exercises: 11,
//         id: 4,
//       },
//     ],
//   },
//   {
//     name: "Node.js",
//     id: 2,
//     parts: [
//       {
//         name: "Routing",
//         exercises: 3,
//         id: 1,
//       },
//       {
//         name: "Middlewares",
//         exercises: 7,
//         id: 2,
//       },
//     ],
//   },
// ];

// const promise = axios.get("http://localhost:3001/notes").then((res) => {
//   const notes = res.data;
//   console.log(notes);
// });

const App = (/*props*/) => {
  return (
    <div>
      <Agenda />
      {/* <Notes /> */}
      {/* notesdb={props.notes} */}
      {/* <Course course={course} /> */}
    </div>
  );
};

export default App;
