import React from "react";

function Result(props) {
  let answers = [];
  for (let i = 0; i < 2; i++) {
    console.log(props.result[i]);
    if (props.result[i].length > 0 && typeof props.result[i] !== "number") {
      let line = "";
      for (let j = 0; j < props.result[i].length; j++) {
        line = line + props.result[i][j].join("") + "\n";
      }
      answers[i] = (
        <div>
          <pre>
            <code dangerouslySetInnerHTML={{ __html: line }} />
          </pre>
        </div>
      );
    } else {
      answers[i] = props.result[i];
    }
  }

  return (
    <div className="Result">
      {answers.map((result, i) => {
        return (
          <div
            className="result"
            onClick={() => navigator.clipboard.writeText(result)}
            key={+i + 1}
          >
            {i + 1} task:
            {result ? result : "no answer"}
          </div>
        );
      })}
    </div>
  );
}

export default Result;
