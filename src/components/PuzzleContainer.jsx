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
    setResult("", "");
  }, [props.day]);

  return (
    <div className="InputField">
      <h2>Day {props.day}</h2>
      <p>
        <a
          className="link"
          href={`https://adventofcode.com/2022/day/${props.day}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          See full description
        </a>
      </p>
      <p>Paste your input data below:</p>
      <form className="input-form" onSubmit={handleSubmit}>
        <textarea value={entry} onChange={(e) => setEntry(e.target.value)} />
        <button className="submit-btn" type="submit">
          Show result
        </button>
        {result ? <Result result={result} /> : <p>Press "Show results"</p>}
      </form>
    </div>
  );
}

export default PuzzleContainer;
