import React from "react";

function Result(props) {
  return (
    <div className="Result">
      <p onClick={() => navigator.clipboard.writeText(props.result[0])}>
        1 task: {props.result[0] ? props.result[0] : "no answer"}
      </p>
      <p onClick={() => navigator.clipboard.writeText(props.result[1])}>
        2 task: {props.result[1] ? props.result[1] : "no answer"}
      </p>
    </div>
  );
}

export default Result;
