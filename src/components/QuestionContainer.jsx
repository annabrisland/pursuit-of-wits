import React, { useState, useEffect } from "react";
import API from "../utils/API";
import API2 from "../utils/API2";
import Question from "./Question";

const QuestionContainer = ({ changeQuestionState, changeBoardState, turn, setTurn, numberOfPlayers, currentCategoryMap }) => {



  const [questionData, setQuestionData] = useState({
    results: {question: "?"},
  });

  const [qNumber, setQNumber] = useState(0);

  useEffect(() => {

    if (qNumber === 2){
      localStorage.removeItem("question-data");
      setQNumber(0);
    }

    if (qNumber === 0){
      if(localStorage.getItem("question-data")){
        setQuestionData(JSON.parse(localStorage.getItem("question-data")));
        setQNumber(1)
      } else {
        searchQuestion();
        setQNumber(1);
      }
    }
  }, [qNumber])

  const searchQuestion = () => {
    API2.search()
      .then((res) => {
        setQuestionData({ ...questionData, results: res.data[0] })
        localStorage.setItem("question-data", JSON.stringify({ ...questionData, results: res.data[0] }));;
      })
      .catch((err) => console.log(err));
  };

  return (

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h2 className="subtitle"> {`Question for Player ${(((localStorage.getItem("turn"))) % numberOfPlayers) + 1}`} </h2>
      {qNumber > 0 ?
        <Question
          title={questionData.results.question}
          categoryName={questionData.results.category}
          correctAnswer={questionData.results.correctAnswer}
          incorrectAnswer={questionData.results.incorrectAnswers}
          changeQuestionState={changeQuestionState}
          changeBoardState={changeBoardState}
          turn={turn}
          setTurn={setTurn}
          qNumber={qNumber}
          setQNumber={setQNumber}
        />
        : ""}
    </div>

  );
};

export default QuestionContainer;
