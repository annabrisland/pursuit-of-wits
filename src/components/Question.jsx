import React, { useEffect, useState } from "react";
import checkAnswer from "../utils/scoring";

const Question = (props) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Create answer array
    const tempAnswers = props.incorrectAnswer ?? [];
    tempAnswers.push(props.correctAnswer);
    setAnswers(tempAnswers);
  }, [props]);

  // Randomise order of answers array
  answers.sort(() => Math.random() - 0.5);

  // Accept answer and score
  const [scoreData, setScoreData] = useState({
    score: 0,
  });
  console.log("score is", scoreData.score);

  const handleAnswer = (event) => {
    setScoreData({
      ...scoreData,
      score: checkAnswer(
        scoreData.score,
        event.target.value,
        props.correctAnswer
      ),
    });
  };

  // Create buttons for each answer
  const answersButtons = [];

  answers.forEach((answer, index) => {
    answersButtons.push(
      <button
        key={index}
        value={answer}
        className="answer"
        onClick={handleAnswer}
      >
        {answer}
      </button>
    );
  });

  return (
    <div>
      <h2 className="question-title">{props.title}</h2>
      <section className="answers">{answersButtons}</section>
    </div>
  );
};

export default Question;
