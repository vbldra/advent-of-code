import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PuzzleContainer from "./PuzzleContainer";
import "./App.css";

function App() {
  const DAYS_ARRAY = [...Array(25).keys()];
  DAYS_ARRAY.shift();
  let donePuzzles = [...Array(24).fill(false)];
  donePuzzles[0] = true
  donePuzzles[1] = true
  donePuzzles[2] = true
  donePuzzles[3] = true
  donePuzzles[4] = true
  donePuzzles[5] = true
  return (
    <BrowserRouter>
      <h1>Advent of code 2022</h1>
      <Routes>
        <Route path="/" element={<Layout days={DAYS_ARRAY} done={donePuzzles} />}>
          {DAYS_ARRAY.map((num, ind) => {
            let path = `day-${num}`;
            if (donePuzzles[ind]) {
              return (
                <Route
                  key={num}
                  path={path}
                  element={<PuzzleContainer day={num} />}
                />
              );
            }
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
