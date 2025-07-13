import React from "react";

function SampleComponent({ title }) {
  return (
    <>
      <h3>Sample Component</h3>
      {title ? <p>title is: {title}</p> : ""}
    </>
  );
}

export default SampleComponent;
