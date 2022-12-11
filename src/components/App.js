import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import PuzzleContainer from "./PuzzleContainer";
import { puzzles } from "../context/puzzle-context";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <h1>Advent of code 2022</h1>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout puzzles={puzzles}/>}>
            <Route path="/" index element={<PuzzleContainer day={1} />} />
            {Object.keys(puzzles).map((num) => {
              let path = `day-${num}`;
                return (
                  <Route
                    key={num}
                    path={path}
                    element={<PuzzleContainer day={Number(num)} />}
                  />
                );
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
