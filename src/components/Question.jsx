import React from "react";

const Question = (props) => {
  // Create answer array
  const answers = props.incorrectAnswer ?? [];
  answers.push(props.correctAnswer);

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
