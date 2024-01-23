import React, { useEffect, useState } from "react";
import Square from "./Square";
import AnimatedAvatar from "./AnimatedAvatar";
import Dicee from "./Dicee";
import QuestionContainer from "./QuestionContainer";


const MainBoard = ({ numberOfPlayers }) => {

    function step(startPos) {
        if (cornerArrays.length === 0) {
            return;
        } else {
            const startSq = cornerArrays[startPos][1];
            const nextSq = cornerArrays[startPos + 1][1];

            const distanceToNextSqX = nextSq[0] - startSq[0];
            const distanceToNextSqY = nextSq[1] - startSq[1];

            if (distanceToNextSqX !== 0) {
                return [distanceToNextSqX, 0];
            } else if (distanceToNextSqY !== 0) {
                return [0, distanceToNextSqY];
            }
        }
    }

    function walk(startPos, endPos) {
        if (cornerArrays.length === 0) {
            return;
        } else if (startPos === 90) {
            return;
        } else if (endPos > 90) {
            let totalDiff = [0, 0];
            for (let i = 0; i < 90 - startPos; i++) {
                let delta = step(startPos + i);
                for (let i = 0; i < 2; i++) {
                    totalDiff[i] = totalDiff[i] + delta[i];
                }
            }
            return totalDiff;
        } else {
            let totalDiff = [0, 0];
            for (let i = 0; i < endPos - startPos; i++) {
                let delta = step(startPos + i);
                for (let i = 0; i < 2; i++) {
                    totalDiff[i] = totalDiff[i] + delta[i];
                }
            }
            return totalDiff;
        }
    }
    // Set up to show & hide components
    const [showDice, setShowDice] = useState(false);
    const [showQuestion, setShowQuestion] = useState(true);
    const [rollState, setRollState] = useState(false);

    const [avatarsConfig, setAvatarsConfig] = useState([]);
  
    const [playerStates, setPlayerStates] = useState([
      { visibility: "visible", player: 0 },
      { visibility: "visible", player: 1 },
      { visibility: "visible", player: 2 },
      { visibility: "visible", player: 3 },
  ]);

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const [totalHeight, setTotalHeight] = useState(0);

    const [totalWidth, setTotalWidth] = useState(0);

    const [cornerArrays, setCornerArrays] = useState([]);

    const [colorMap, setColorMap] = useState(["white"]);

    const [cPositions, setCPositions] = useState(JSON.parse(localStorage.getItem("c-positions")));

    const [diceState, setDiceState] = useState({
        rollNumber: 0,
        diceNumber: 1,
    });

    const [playerPosition, setPlayerPosition] = useState((JSON.parse(localStorage.getItem("player-position"))));

    const [playerTurn, setPlayerTurn] = useState(+localStorage.getItem("player-turn"));
    const [turn, setTurn] = useState(+localStorage.getItem("turn"));

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);

        const squaresWide = Math.floor((window.innerWidth - 120) / 120);
        const totalSquares = 90;
        const neededHeight = Math.ceil(totalSquares / squaresWide) * 120;
        const neededWidth = squaresWide * 120;
        setTotalHeight(neededHeight);
        setTotalWidth(neededWidth);

        let tempMap = {};

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

            tempMap = { ...tempMap, [`${squareId - 1}`]: [colNum * 120, rowNum * 120] };
        }

        setCornerArrays(Object.entries(tempMap));
        localStorage.setItem("cornerArrays", JSON.stringify(Object.entries(tempMap)));

        let tempPositions = { 0: [0, 0], 1: [0, 0], 2: [0, 0], 3: [0, 0] }

        for (let i = 0; i < numberOfPlayers; i++) {
            let vector = [0, 0]
            for (let j = 0; j < 2; j++) {
                {playerPosition ? vector[j] = +[(Object.entries(tempMap)[playerPosition[i].current])[1][j]] : null;}
                
            }
            tempPositions = { ...tempPositions, [i]: vector }
        }

        setCPositions(tempPositions);
        localStorage.setItem("c-positions", JSON.stringify(tempPositions));
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, [windowSize]);

    useEffect(() => {

        if (!localStorage.getItem("color-map")) {
            let tempColorMap = ["white"];

            const colors = ["#F4511E", "#D81B60", "#1E88E5", "#7CB342", "#FFB300"];

            for (let i = 0; i < 90; i++) {
                tempColorMap.push(colors[Math.floor(Math.random() * 5)]);
            }

            setColorMap(tempColorMap);
            localStorage.setItem("color-map", JSON.stringify(tempColorMap));
        } else {
            const tempColorMap = JSON.parse(localStorage.getItem("color-map"));
            setColorMap(tempColorMap);
        }

        if (!localStorage.getItem("c-positions")) {
            setCPositions( JSON.stringify(Object.entries({0: [0, 0], 1: [0, 0], 2: [0, 0], 3: [0, 0]})));
        } else {
            const cPositions = JSON.parse(localStorage.getItem("c-positions"));
            setCPositions(cPositions);
        }

        if (!localStorage.getItem("turn")) {
            localStorage.setItem("turn", 0);
            setTurn(0);
            setPlayerTurn(0);
        } else {
            setTurn(+localStorage.getItem("turn"));
            setPlayerTurn(+localStorage.getItem("turn")%numberOfPlayers);
        }

        if (!localStorage.getItem("player-position")){
            setPlayerPosition({0:{old: 0, current: 0}, 1:{old: 0, current: 0}, 2:{old: 0, current: 0}, 3:{old: 0, current: 0}})
        } else {
            setPlayerPosition(JSON.parse(localStorage.getItem("player-position")))
        }

        if (localStorage.getItem("avatarSeeds")) {
            const avatarSeeds = JSON.parse(localStorage.getItem("avatarSeeds"));
            const selectedCharacters = JSON.parse(localStorage.getItem("selectedCharacters"));
            const tempArray = [];
      
            for (let i = 0; i < 4; i++) {
              if (selectedCharacters[i]) {
                tempArray.push({ state: playerStates[i], seed: avatarSeeds[selectedCharacters[i].index] });
              } else {
                tempArray.push({ state: { visibility: 'hidden', player: i }, seed: `empty` });
              }
            }
      
            localStorage.setItem("avatars-config", JSON.stringify(tempArray));
            console.log(tempArray);
            setAvatarsConfig(tempArray);
          }

    }, []);


    useEffect(() => {

        if((numberOfPlayers === 0)||(!playerPosition)){
            return
        } else {
            console.log(playerPosition);
            const updateNum = (localStorage.getItem("turn"))%numberOfPlayers;
            if (
                !walk(playerPosition[updateNum].old, playerPosition[updateNum].current)
            ) {
                return;
            } else {
                let moveVector;
                if (playerPosition[updateNum].current >= 89) {
                    moveVector = walk(playerPosition[updateNum].old, 89);
                } else {
                    moveVector = walk(
                        playerPosition[updateNum].old,
                        playerPosition[updateNum].current
                    );
                }
    
                const startX = cPositions[updateNum][0];
                const endX = startX + moveVector[0];
                const startY = cPositions[updateNum][1];
                const endY = startY + moveVector[1];
    
                setCPositions({ ...cPositions, [updateNum]: [endX, endY] });
                localStorage.setItem("c-positions", JSON.stringify({ ...cPositions, [updateNum]: [endX, endY] }))
            }
    
        }


    }, [playerPosition]);

    return (
        <section>
            {showQuestion ? (
                <QuestionContainer
                    changeQuestionState={setShowQuestion}
                    changeBoardState={setShowDice}
                    setRollState={setRollState}
                    turn={turn}
                    playerTurn={playerTurn}
                    setTurn={setTurn}
                    setPlayerTurn={setPlayerTurn}
                    numberOfPlayers={numberOfPlayers}
                />
            ) : <Dicee
                setParentDiceState={setDiceState}
                setPlayerPosition={setPlayerPosition}
                currentPosition={playerPosition}
                setPlayerTurn={setPlayerTurn}
                playerTurn={playerTurn}
                setTurn={setTurn}
                numberOfPlayers={numberOfPlayers}
                turn={turn}
                changeQuestionState={setShowQuestion}
                changeBoardState={setShowDice}
                rollState={rollState}
                setRollState={setRollState}
            />}

            <div
                style={{
                    position: "relative",
                    height: totalHeight,
                    width: totalWidth,
                    margin: "60px",
                }}
            >
                {cornerArrays.map((item) => (
                    <Square
                        key={item[0]}
                        squareNumber={item[0]}
                        left={item[1][0]}
                        top={item[1][1]}
                        color={colorMap[item[0]]}
                    />
                ))}
                {(cPositions) ? avatarsConfig.map(({ state, seed }) => (
                    <AnimatedAvatar
                        left={cPositions[state.player][0]}
                        top={cPositions[state.player][1]}
                        visibility={state.visibility}
                        key={state.player}
                        seed={seed}
                    />
                )) : null}
            </div>
        </section>
    );
};

export default MainBoard;
