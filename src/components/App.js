import './App.css';
import PuzzleContainer from './PuzzleContainer'
import puzzleContext from '../puzzle-context';

function App() {
  let DAYS_ARRAY = [...Array(24).keys()];
  console.log(puzzleContext)
  return (
    <div className="App">
      <h1>Advent of code 2022</h1>
      
      {DAYS_ARRAY.map((num) => {
        return <PuzzleContainer day={num + 1} key={num}/>
      })}  
    </div>
  );
}

export default App;
