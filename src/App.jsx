

import MainBoard from "./components/MainBoard";
import "./App.css";

import QuestionContainer from "./components/QuestionContainer";

import Dicee from "./components/Dicee";

import "./App.css";


const App = () => {


  return (

    <div style={{ position: "relative", height: "auto" }}>


 
      <QuestionContainer />

      <Dicee />
      <MainBoard />

    </div>
  );
};

export default App;
