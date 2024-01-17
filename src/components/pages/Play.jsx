import MainBoard from "../MainBoard";
import QuestionContainer from "../QuestionContainer";
import DiceGame from "../Dicee";

const Play = () => {
    return (
        <div style={{ position: "relative", height: "auto" }}>
            <QuestionContainer />
            <DiceGame />
            <MainBoard />
        </div>
    )
}

export default Play;