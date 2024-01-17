import Gameboard from "./components/Gameboard";
import MainBoard from "./components/MainBoard";
import "./App.css";
import Dicee from "./components/Dicee";

const App = () => {


  return (
    <div style={{ position: "relative", height: "auto" }}>

      <Dicee />
      <MainBoard />

    </div>
  );
};

export default App;
