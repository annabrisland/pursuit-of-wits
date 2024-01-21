import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Question from "./Question";

const QuestionContainer = ({changeQuestionState, changeBoardState, turn, setTurn, playerTurn, setPlayerTurn, numberOfPlayers}) => {
  const category = 9;

  const [questionData, setQuestionData] = useState({
    category: "9",
    results: {},
  });

  const [qNumber, setQNumber] = useState(0);

  useEffect(()=>{
    searchQuestion(category);
  }, [qNumber])

  const searchQuestion = (category) => {
    API.search(category)
      .then((res) =>
        setQuestionData({ ...questionData, results: res.data.results[0] })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h1> {`Player ${playerTurn + 1}'s Turn!!`} </h1>
      <Question
        title={questionData.results.question}
        correctAnswer={questionData.results.correct_answer}
        incorrectAnswer={questionData.results.incorrect_answers}
        changeQuestionState={changeQuestionState}
        changeBoardState={changeBoardState}
        numberOfPlayers={numberOfPlayers}
        turn={turn}
        playerTurn={playerTurn}
        setTurn={setTurn}
        setPlayerTurn={setPlayerTurn}
        qNumber={qNumber}
        setQNumber={setQNumber}
      />
    </div>
  );
};

export default QuestionContainer;
