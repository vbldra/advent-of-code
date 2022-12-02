import React from "react";
import Result from "./Result";
import { useState } from "react";
import { puzzleFunc } from "../context/puzzle-context";

function PuzzleContainer(props) {
  const [entry, setEntry] = useState("");
  const [result, setResult] = useState(["", ""]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let arrayOfStrings = entry.split(`\n`);
    setResult(puzzleFunc(arrayOfStrings, props.day));
  };

  return (
    <div className="InputField">
      <p>Puzzle input. Day {props.day}</p>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            rows="8"
            cols="40"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </label>
        <button type="submit" >Show result</button>
      </form>
      {result ? <Result result={result} /> : <p>No answer</p>}
      <hr />
    </div>
  );
}

export default PuzzleContainer;
