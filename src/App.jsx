import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SetUp from "./components/pages/SetUp";
import Play from "./components/pages/Play";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SetUp />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </Router>
  );
};

export default App;
