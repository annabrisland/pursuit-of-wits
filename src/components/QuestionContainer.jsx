import React, { useState } from "react";
import API from "../utils/API";
import Question from "./question";

const QuestionContainer = () => {
  const category = 9;

  const [questionData, setQuestionData] = useState({
    category: "9",
    results: {},
  });

  const searchQuestion = (category) => {
    API.search(category)
      .then((res) =>
        setQuestionData({ ...questionData, results: res.data.results[0] })
      )
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    searchQuestion(category);
  };

  return (
    <div>
      <button onClick={handleSubmit}>Get Question</button>
      <Question
        title={questionData.results.question}
        correctAnswer={questionData.results.correct_answer}
        incorrectAnswer={questionData.results.incorrect_answers}
      />
    </div>
  );
};

export default QuestionContainer;
