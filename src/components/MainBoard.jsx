import React, { useEffect, useState } from "react";
import Square from "./Square";
import Character from "./Character";
import Dicee from "./Dicee";
import { useAnimate } from "framer-motion";

const MainBoard = () => {

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const [totalHeight, setTotalHeight] = useState(0);

    const [totalWidth, setTotalWidth] = useState(0);

    const [cornerArrays, setCornerArrays] = useState([]);

    const [colorMap, setColorMap] = useState(["white"]);

    const [c1Positions, setC1Positions] = useState([0, 0])

    const [diceState, setDiceState] = useState({
        rollNumber: 0,
        diceNumber: 1
    });

    const [playerPosition, setPlayerPosition] = useState({
        old: 1,
        current: 1
    });

    const [scope, animate] = useAnimate();

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);


        const squaresWide = Math.floor((window.innerWidth - 120) / 120);
        const totalSquares = 90;
        const neededHeight = Math.ceil(totalSquares / squaresWide) * 120;
        const neededWidth = squaresWide * 120
        setTotalHeight(neededHeight);
        setTotalWidth(neededWidth);
        // const gameBoardContainer = document.getElementById("game-board-container");

        let tempMap = {}

        for (let i = 0; i < totalSquares; i++) {
            let square = document.createElement("div");
            square.classList.add("board-square", "color-square");
            square.style.setProperty("--square-index", i);

            const colNum = i % squaresWide;
            const rowNum = Math.floor(i / squaresWide);
            let squareId = 0;

            if (rowNum % 2 === 0) {
                squareId = rowNum * squaresWide + colNum + 1;
            } else {
                squareId = (rowNum + 1) * squaresWide - colNum;
            }

            tempMap = { ...tempMap, [`${squareId}`]: [rowNum * 120, colNum * 120] }
        }

        setCornerArrays(Object.entries(tempMap));
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, [windowSize]);

    useEffect(() => {
        let tempColorMap = ["white"];

        const colors = ["green", "red", "lightblue", "grey", "yellow"];  //adapt as necessary

        for (let i = 0; i < 100; i++) {
            tempColorMap.push(colors[Math.floor(Math.random() * (5))])
        };

        setColorMap(tempColorMap);
    }, [])

    useEffect(() => {
        if (!walk(playerPosition.old, playerPosition.current)) {
            return
        } else {
            console.log(walk(playerPosition.old, playerPosition.current));
            let moveVector;
            if (playerPosition.current >= 90){
                moveVector = walk(playerPosition.old, 90);
            } else {
                moveVector = walk(playerPosition.old, playerPosition.current);
            }
            
            const startX = c1Positions[0];
            const endX = startX + moveVector[1];
            const startY = c1Positions[1];
            const endY = startY + moveVector[0];

            setC1Positions([endX, endY])
        }
    }, [playerPosition])

    function step(startPos) {
        if (cornerArrays.length === 0) {
            return
        } else {
            const startSq = cornerArrays[startPos - 1][1];
            const nextSq = cornerArrays[startPos][1];

            const distanceToNextSqX = nextSq[0] - startSq[0]
            const distanceToNextSqY = nextSq[1] - startSq[1]

            if (distanceToNextSqX !== 0) {
                return [distanceToNextSqX, 0];
            } else if (distanceToNextSqY !== 0) {
                return [0, distanceToNextSqY]
            }
        }
    }

    function walk(startPos, endPos) {
        if (cornerArrays.length === 0) {
            return
        } else if (startPos === 90){
            return
        } else if (endPos > 90 ){
            return;
        } else {
            const totalDiff = [0, 0]
            for (let i = 0; i < endPos - startPos; i++) {
                let delta = step(startPos + i);
                for (let i = 0; i < 2; i++) {
                    totalDiff[i] = totalDiff[i] + delta[i];
                }
            }
            return totalDiff;
        }

    }

    return (
        <section ref={scope}>
            <Dicee setParentDiceState={setDiceState} setPlayerPosition={setPlayerPosition} currentPosition={playerPosition.current} />
            <div style={{ position: "relative", height: totalHeight, width: totalWidth, margin: "60px" }}>
                {cornerArrays.map(item =>
                    (<Square key={item[0]} squareNumber={item[0]} top={item[1][0]} left={item[1][1]} color={colorMap[item[0]]} />))
                }
                <Character top={c1Positions[1]} left={c1Positions[0]} />

            </div>
        </section>
    )

}

export default MainBoard;