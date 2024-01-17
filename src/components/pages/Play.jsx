import React, { useState } from 'react'

import MainBoard from "../MainBoard";

import QuestionContainer from "../QuestionContainer";

import Dicee from "../Dicee";

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