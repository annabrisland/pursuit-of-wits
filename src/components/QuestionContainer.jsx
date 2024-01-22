import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Question from "./Question";

const QuestionContainer = ({ changeQuestionState, changeBoardState, turn, setTurn, playerTurn, setPlayerTurn, numberOfPlayers }) => {
  const category = 9;

  const [questionData, setQuestionData] = useState({
    results: {},
  });

  const [qNumber, setQNumber] = useState(0);

  useEffect(() => {

    if (qNumber > 0) {
      if (JSON.parse(localStorage.getItem("question-data"))) {
        setQuestionData(JSON.parse(localStorage.getItem("question-data")))
      } else {
        searchQuestion(category);
      }
    }


  }, [qNumber])

  useEffect(() => {


    if (!JSON.parse(localStorage.getItem("question-data"))) {
      searchQuestion(category);
    } else {
      setQuestionData(JSON.parse(localStorage.getItem("question-data")))
    }


  }, []);

  const searchQuestion = (category) => {
    API.search(category)
      .then((res) => {
        setQuestionData({ ...questionData, results: res.data.results[0] })
        localStorage.setItem("question-data", JSON.stringify({ ...questionData, results: res.data.results[0] }));;
      })
      .catch((err) => console.log(err));
  };

  return (

    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <h2 className="subtitle"> {`Player ${playerTurn + 1}'s Question`} </h2>
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
