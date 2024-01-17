import Gameboard from "./components/Gameboard";
import QuestionContainer from "./components/QuestionContainer";
import Dicee from "./components/Dicee";

import "./App.css";


const App = () => {
  return (
    <div>
      <QuestionContainer />
      <Dicee />
      <Gameboard />
    </div>
  );
};

export default App;
