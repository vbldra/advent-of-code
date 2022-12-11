import React from "react";
import Result from "./Result";
import { useState, useEffect } from "react";
import { puzzleFunc } from "../context/puzzle-context";

function PuzzleContainer(props) {
  const [entry, setEntry] = useState("");
  const [result, setResult] = useState(["", ""]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let arrayOfStrings = entry.split(`\n`);
    setResult(puzzleFunc(arrayOfStrings, props.day));
    localStorage.setItem(`${props.day}-input`, JSON.stringify(entry));
  };

  useEffect(() => {
    const input = JSON.parse(localStorage.getItem(`${props.day}-input`));
    input ? setEntry(input) : setEntry("");
  }, [props.day]);

  return (
    <div className="InputField">
      <h2>Day {props.day}</h2>
      <p>
        <a
          href={`https://adventofcode.com/2022/day/${props.day}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See full description
        </a>
      </p>
      <p>Paste your input data below:</p>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            rows="8"
            cols="40"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </label>
        <button type="submit">Show result</button>
      </form>
      {result ? <Result result={result} /> : <p>No answer</p>}
    </div>
  );
}

export default PuzzleContainer;
