import Gameboard from "./components/Gameboard";
import "./App.css";
import Dicee from "./components/Dicee";

const App = () => {
  return (
    <div>
      <Dicee />
      <Gameboard />
    </div>
  );
};

export default App;
