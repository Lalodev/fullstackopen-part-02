import React from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

export const Course = ({ course }) => {
  // console.log(course);

  return (
    <div>
      {course.map((item) => (
        <div key={item.id}>
          <Header name={item.name} />
          <Content key={item.id} parts={item.parts} />
          <Total parts={item.parts} />
        </div>
      ))}
    </div>
  );
};
