import React, { useEffect, useState } from "react";

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

  // Create buttons for each answer
  const answersButtons = [];

  answers.forEach((answer, index) => {
    answersButtons.push(
      <button key={index} className="answer">
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
