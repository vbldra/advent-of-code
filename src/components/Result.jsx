import React from "react";

function Result(props) {
  return (
    <div className="Result">
      <p>1 task: {props.result[0]}</p>
      <p>2 task: {props.result[1]}</p>
    </div>
  );
}

export default Result;
