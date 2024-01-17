const checkAnswer = (chosen, correct) => {
    return chosen == correct ? console.log(chosen + " is Correct!") : console.log(chosen + " is Incorrect :(");
}

export default checkAnswer;