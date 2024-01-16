import React, { useState } from "react";
import API from "../utils/API";
import Question from "./question";

const QuestionContainer = () => {
    const category = 9; 

    // const [ questionData, setQuestionData ] = useState({
    //     category: "9",
    //     results: [],
    // });

    const searchQuestion = category => {
        API.search(category)
        .then((res) => {console.log(res.data.results[0])})
    };

    const handleSubmit = () => {
        searchQuestion(category);
    };

    return (
        <div>
        <button
        onClick={handleSubmit}/>
        <Question />
        </div>
    );
}

export default QuestionContainer;