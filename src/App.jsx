import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SetUp from "./components/pages/SetUp";
import Play from "./components/pages/Play";
import Results from "./components/pages/Results";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetUp />} />
        <Route path="/play" element={<Play />} />
        <Route path="/podium" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
