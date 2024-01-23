import Podium from "../Podium";
import { NavLink } from "react-router-dom";
import "../../Podium.css";

const Results = () => {
    return (
        <div className="results-page">
            <h1>and the winner is...</h1>
            <Podium />
            <NavLink
              to="/play"
            >
              Rematch
            </NavLink>
        </div>
    )
}

export default Results;