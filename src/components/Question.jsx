import React, { useEffect, useState } from "react";
import checkAnswer from "../utils/scoring";

const Question = (props) => {

  const [answers, setAnswers] = useState([]);

  const [givenAnswer, setGivenAnswer] = useState('');
  const [pageCountDown, setPageCountDown] = useState((localStorage.getItem("page-countdown")));
  const [answerButtons, setAnswerButtons] = useState([]);

  useEffect(() => {
    // Create answer array
    const tempAnswers = props.incorrectAnswer ?? [];
    tempAnswers.push(props.correctAnswer);
    tempAnswers.sort(() => Math.random() - 0.5);
    tempAnswers.sort(() => Math.random() - 0.5);
    tempAnswers.sort(() => Math.random() - 0.5);
    setAnswers(tempAnswers);

    // Randomise order of answers array
    answers.sort(() => Math.random() - 0.5);

    // Console.log for debugging
    console.log(decodeURIComponent(props.correctAnswer));

  }, [props]);

  useEffect(() => {

    setTimeout(() => {
      if (pageCountDown > 0) {
        const myCountdown = +localStorage.getItem("page-countdown");
        localStorage.setItem("page-countdown", (myCountdown - 1));

        setPageCountDown(myCountdown - 1);
      } else {
        const myCountdown = +localStorage.getItem("page-countdown");
        localStorage.setItem("page-countdown", (myCountdown - 1));
        if (checkAnswer(givenAnswer, props.correctAnswer) === 0) {
          localStorage.removeItem("question-data");
          props.setTurn(props.turn + 1);
          localStorage.setItem("turn", +(props.turn + 1));
          localStorage.setItem("page-countdown", 20);
          setPageCountDown(20);
          props.setQNumber(props.qNumber + 1);
          console.log("Incorrect Answer :(");
        }
        else if (checkAnswer(givenAnswer, props.correctAnswer) > 0) {
          props.changeQuestionState(false);
          props.changeBoardState(true);
          setPageCountDown(20);
          localStorage.setItem("page-countdown", 20);
          localStorage.removeItem("question-data");
        }
      }
    }, 1000)

  }, [pageCountDown])


  // Accept answer and score
  const handleAnswer = (event) => {

    setGivenAnswer(event.target.value);

  };

  useEffect(() => {
    // Create buttons for each answer
    const answersButtons = [];
    if (answers.length !== 0) {
      answers.forEach((answer, index) => {
        answersButtons.push(
          answer ? (
            <button
              key={index}
              value={answer}
              className="answer"
              onClick={handleAnswer}
            >
              {decodeURIComponent(answer)}
            </button>
          ) : (
            ""
          ))
      });
    }
    setAnswerButtons(answersButtons);

  }, [answers]);

  return (
    <div className="question">
      <div>
      <div>
        <h2 className="question-title" >
          {props.title !== undefined ? decodeURIComponent(props.title) : ""}
        </h2>
      </div>
      <section className="answers">{answerButtons}</section>
      </div>
      <div className="countdown">{props.title !== undefined ? <h2>{localStorage.getItem("page-countdown")}</h2> : ""}</div>
    </div>
  );
};

export default Question;
