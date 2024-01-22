import React, { useEffect, useState } from "react";
import checkAnswer from "../utils/scoring";

const Question = (props) => {

  const [answers, setAnswers] = useState([]);

  const [givenAnswer, setGivenAnswer] = useState('');
  const [pageCountDown, setPageCountDown] = useState(20);

  useEffect(() => {
    // Create answer array
    const tempAnswers = props.incorrectAnswer ?? [];
    tempAnswers.push(props.correctAnswer);
    setAnswers(tempAnswers);

    // Randomise order of answers array
    answers.sort(() => Math.random() - 0.5);
  
    // Console.log for debugging
    console.log(decodeURIComponent(props.correctAnswer));

  }, [props]);

  useEffect(()=>{

    setTimeout(() => {
      if (pageCountDown > 0){
      setPageCountDown(pageCountDown - 1)
      } else {
        if(checkAnswer(givenAnswer, props.correctAnswer) === 0){
          props.setTurn(props.turn + 1);
          props.setPlayerTurn((props.turn + 1) % props.numberOfPlayers)
          props.setQNumber(props.qNumber + 1);
          setPageCountDown(20);
          console.log("Incorrect Answer :(");
        }
        else if (checkAnswer(givenAnswer, props.correctAnswer) > 0) {
          props.changeQuestionState(false);
          props.changeBoardState(true);
        }
      }
    }, 1000)

  }, [pageCountDown])


  // Accept answer and score
  const handleAnswer = (event) => {

    setGivenAnswer(event.target.value);

  };

// Create buttons for each answer
  const answersButtons = [];
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
      )
    );
  });

  return (
    <div className="question">
      <div>
      <div>
        <h2 className="question-title" >
          {props.title !== undefined ? decodeURIComponent(props.title) : ""}
        </h2>
      </div>
      <section className="answers">{answersButtons}</section>
      </div>
      <div className="countdown">{pageCountDown}</div>
    </div>
  );
};

export default Question;
