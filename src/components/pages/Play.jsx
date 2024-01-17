import React, { useState } from 'react'

import MainBoard from "../components/MainBoard";

import QuestionContainer from "../components/QuestionContainer";

import Dicee from "../components/Dicee";

import "../App.css";

const Play = () => {


    const [diceNumber, setDiceNumber] = useState(1);
    const [playerPosition, setPlayerPosition] = useState(0);



    return (

        <div style={{ position: "relative", height: "auto" }}>

            <QuestionContainer />

            <Dicee setDiceNumber={setDiceNumber} movePlayer={setPlayerPosition} />
            <MainBoard playerPosition={playerPosition} />

        </div>
    )
}

export default Play;