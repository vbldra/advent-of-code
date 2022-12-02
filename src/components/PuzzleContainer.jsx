import Result from "./Result";
import { useState } from "react";
import { findSum, findSumThreeBest } from "../puzzle-context";

function PuzzleContainer(props) {
  const [entry, setEntry] = useState("");
  const [result, setResult] = useState(["", ""]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let arrayOfStrings = entry.split(`\n`);
    let arrayOfNumbers = [];
    // Converting array of string to array of numbers
    for (let i = 0; i < arrayOfStrings.length; i++) {
      arrayOfNumbers.push(Number(arrayOfStrings[i]));
    }
    setResult([findSum(arrayOfNumbers), findSumThreeBest(arrayOfNumbers)]);
  };

  return (
    <div className="InputField">
      <p>Puzzle input. Day {props.day}</p>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            rows="10"
            cols="50"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
      <Result result={result} />
    </div>
  );
}

export default PuzzleContainer;
