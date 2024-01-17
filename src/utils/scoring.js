const checkAnswer = (score, chosen, correct) => {
    return chosen == correct ? score + 1 : score;
}

export default checkAnswer;