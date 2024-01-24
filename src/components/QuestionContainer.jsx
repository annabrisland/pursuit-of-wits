import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Question from "./Question";

const QuestionContainer = ({ changeQuestionState, changeBoardState, turn, setTurn, numberOfPlayers, currentCategoryMap }) => {



  const [questionData, setQuestionData] = useState({
    results: {question: "?"},
  });

  const [qNumber, setQNumber] = useState(0);

  useEffect(() => {

    if (qNumber > numberOfPlayers - 1){
      const catMap = JSON.parse(localStorage.getItem("sub-map"));
      searchQuestion(catMap[turn%numberOfPlayers].category)
    }
    if (qNumber > 0) {
      if(localStorage.getItem("question-data")){
        setQuestionData(JSON.parse(localStorage.getItem("question-data")))
      }
    }
  }, [qNumber])

  useEffect(() => {
    localStorage.setItem("sub-map", JSON.stringify(currentCategoryMap));
    searchQuestion(currentCategoryMap[turn%numberOfPlayers].category)
    setQNumber(1);
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

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 className="subtitle"> {`Question for Player ${(((localStorage.getItem("turn"))) % numberOfPlayers) + 1}`} </h2>
      {qNumber > 0 ?
        <Question
          title={questionData.results.question}
          categoryName={currentCategoryMap[turn%numberOfPlayers].categoryName}
          correctAnswer={questionData.results.correct_answer}
          incorrectAnswer={questionData.results.incorrect_answers}
          changeQuestionState={changeQuestionState}
          changeBoardState={changeBoardState}
          turn={turn}
          setTurn={setTurn}
          qNumber={qNumber}
          setQNumber={setQNumber}
        />
        : ""};
    </div>

  );
};

export default QuestionContainer;
