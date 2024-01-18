import React, { useState, useEffect } from 'react'

import MainBoard from "../MainBoard";

import QuestionContainer from "../QuestionContainer";

import Dicee from "../Dicee";

const Play = () => {

    return (

        <div style={{ position: "relative", height: "auto" }}>

            <QuestionContainer />

            <MainBoard />

        </div>
    )
}

export default Play;