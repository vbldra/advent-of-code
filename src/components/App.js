import React from "react";
import './App.css';
import PuzzleContainer from './PuzzleContainer'

function App() {
  const DAYS_ARRAY = [...Array(24).keys()];
  let donePuzzles = [...Array(24).fill(false)]
  donePuzzles[0]= true
  donePuzzles[1]= true
  return (
    <div className="App">
      <h1>Advent of code 2022</h1>
      {DAYS_ARRAY.map((num) => {
        {if (donePuzzles[num]) {
          return <PuzzleContainer day={num + 1} key={num}/>
        }}
      })}  
    </div>
  );
}

export default App;