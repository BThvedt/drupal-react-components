import React from "react";

function HelloWorld({ title }) {
  return (
    <>
      <h3>Hello, World!</h3>
      {title ? <p>title is: {title}</p> : ""}
    </>
  );
}

export default HelloWorld;
