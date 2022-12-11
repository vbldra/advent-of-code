import React from "react";

function Result(props) {
  return (
    <div className="Result">
      <p onClick={()=>navigator.clipboard.writeText(props.result[0])}>1 task: {props.result[0]}</p>
      <p onClick={()=>navigator.clipboard.writeText(props.result[1])}>2 task: {props.result[1]}</p>
    </div>
  );
}

export default Result;
