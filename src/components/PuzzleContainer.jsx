import InputField from './InputField'
import Result from './Result'

function PuzzleContainer(props) {
  return (
    <div className="PuzzleContainer">
      <h2>Day {props.day}</h2>
      <InputField />
      <Result />
    </div>
  );
}

export default PuzzleContainer;
