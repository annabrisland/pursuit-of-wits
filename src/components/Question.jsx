import React, { useEffect, useState } from "react";
import checkAnswer from "../utils/scoring";

const Question = (props) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Create answer array
    const tempAnswers = props.incorrectAnswer ?? [];
    tempAnswers.push(props.correctAnswer);
    setAnswers(tempAnswers);

    // Randomise order of answers array
    answers.sort(() => Math.random() - 0.5);
  }, [props]);

  // Accept answer and score
  const handleAnswer = (event) => {
    props.changeQuestionState(false);
    if (checkAnswer(event.target.value, props.correctAnswer) > 0) {
      props.changeBoardState(true);
    } else {
      console.log("Incorrect :(");
    }
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
        {decodeURIComponent(answer)}
      </button>
    );
  });

  return (
    <div>
      <h2 className="question-title">{decodeURIComponent(props.title)}</h2>
      <section className="answers">{answersButtons}</section>
    </div>
  );
};

export default Question;
