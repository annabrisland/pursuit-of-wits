import React, { useEffect, useState } from "react";
import Square from "./Square";
import AnimatedAvatar from "./AnimatedAvatar";
import Dicee from "./Dicee";
import QuestionContainer from "./QuestionContainer";
import { NavLink } from "react-router-dom";

const MainBoard = ({ numberOfPlayers }) => {
    const totalCells = 10;

    function handleGameOver(e) {
        e.preventDefault();

    }
    function step(startPos) {
        if (cornerArrays.length === 1) {
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
            } else if (distanceToNextSqX === 0 && distanceToNextSqY === 0) {
                return [0, 0];
            }
        }
    }

    function walk(startPos, endPos) {
        if (cornerArrays.length === 1) {
            return;
        } else if (startPos === endPos) {
            return [0, 0];
        } else if (startPos === totalCells) {
            return;
        } else if (endPos >= totalCells) {
            let totalDiff = [0, 0];
            for (let i = 0; i < totalCells - startPos; i++) {
                let delta = step(startPos + i);
                for (let j = 0; j < 2; j++) {
                    totalDiff[j] = totalDiff[j] + delta[j];
                }
            }
            return totalDiff;
        } else {
            let totalDiff = [0, 0];
            for (let i = 0; i < endPos - startPos; i++) {
                let delta = step(startPos + i);
                for (let j = 0; j < 2; j++) {
                    totalDiff[j] = totalDiff[j] + delta[j];
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

    const [cornerArrays, setCornerArrays] = useState([[0, [0, 0]]]);

    const [colorMap, setColorMap] = useState(["white"]);

    const [categoryMap, setCategoryMap] = useState(
        JSON.parse(localStorage.getItem("category-map"))
    );
    const [currentCategoryMap, setCurrentCategoryMap] = useState(
        JSON.parse(localStorage.getItem("current-category-map"))
    );

    const [cPositions, setCPositions] = useState(
        JSON.parse(localStorage.getItem("c-positions"))
    );

    const [diceState, setDiceState] = useState({
        rollNumber: 0,
        diceNumber: 1,
    });

    const [playerPosition, setPlayerPosition] = useState(
        JSON.parse(localStorage.getItem("player-position"))
    );

    const [playerTurn, setPlayerTurn] = useState(1);
    const [turn, setTurn] = useState(1);

    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener("resize", handleWindowResize);

        const squaresWide = Math.floor((window.innerWidth - 120) / 120);
        const totalSquares = totalCells;
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

            tempMap = {
                ...tempMap,
                [`${squareId - 1}`]: [colNum * 120, rowNum * 120],
            };
        }

        setCornerArrays(Object.entries(tempMap));
        localStorage.setItem(
            "cornerArrays",
            JSON.stringify(Object.entries(tempMap))
        );

        let tempPositions = { 0: [0, 0], 1: [0, 0], 2: [0, 0], 3: [0, 0] };

        for (let i = 0; i < numberOfPlayers; i++) {
            let vector = [0, 0];
            for (let j = 0; j < 2; j++) {
                {
                    playerPosition
                        ? (vector[j] = +[
                            Object.entries(tempMap)[playerPosition[i].current][1][j],
                        ])
                        : null;
                }
            }
            tempPositions = { ...tempPositions, [i]: vector };
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
            let tempCategoryMap = [
                { categoryName: "General Knowledge", category: 9 },
            ];

            const colors = ["#F4511E", "#D81B60", "#1E88E5", "#7CB342", "#FFB300"];
            const categories = [
                { categoryName: "General Knowledge", category: 9 },
                { categoryName: "Sports", category: 21 },
                { categoryName: "Geography", category: 22 },
                { categoryName: "Science", category: 17 },
                { categoryName: "Art", category: 25 },
            ];

            for (let i = 0; i < totalCells; i++) {
                let random = Math.floor(Math.random() * 5);
                tempColorMap.push(colors[random]);
                tempCategoryMap.push(categories[random]);
            }

            setColorMap(tempColorMap);
            setCategoryMap(tempCategoryMap);
            localStorage.setItem("category-map", JSON.stringify(tempCategoryMap));
            localStorage.setItem("color-map", JSON.stringify(tempColorMap));
        } else {
            const tempColorMap = JSON.parse(localStorage.getItem("color-map"));
            setColorMap(tempColorMap);
            const tempCategoryMap = JSON.parse(localStorage.getItem("category-map"));
            setCategoryMap(tempCategoryMap);
        }

        if (!localStorage.getItem("c-positions")) {
            localStorage.setItem(
                "c-positions",
                JSON.stringify({ 0: [0, 0], 1: [0, 0], 2: [0, 0], 3: [0, 0] })
            );
            setCPositions({ 0: [0, 0], 1: [0, 0], 2: [0, 0], 3: [0, 0] });
        } else {
            setCPositions(JSON.parse(localStorage.getItem("c-positions")));
        }

        if (!localStorage.getItem("turn")) {
            localStorage.setItem("turn", 1);
            setTurn(1);
        } else {
            setTurn(+localStorage.getItem("turn"));
        }

        if (!localStorage.getItem("player-position")) {
            localStorage.setItem(
                "player-position",
                JSON.stringify({
                    0: { old: 0, current: 0 },
                    1: { old: 0, current: 0 },
                    2: { old: 0, current: 0 },
                    3: { old: 0, current: 0 },
                })
            );
            setPlayerPosition({
                0: { old: 0, current: 0 },
                1: { old: 0, current: 0 },
                2: { old: 0, current: 0 },
                3: { old: 0, current: 0 },
            });
        } else {
            setPlayerPosition(JSON.parse(localStorage.getItem("player-position")));
        }

        if (!localStorage.getItem("current-category-map")) {
            let initCurrent = {
                0: { categoryName: "General Knowledge", category: 9 },
                1: { categoryName: "General Knowledge", category: 9 },
                2: { categoryName: "General Knowledge", category: 9 },
                3: { categoryName: "General Knowledge", category: 9 },
            };
            setCurrentCategoryMap(initCurrent);
            localStorage.setItem("current-category-map", JSON.stringify(initCurrent));
        } else {
            setCurrentCategoryMap(
                JSON.parse(localStorage.getItem("current-category-map"))
            );
            console.log(JSON.parse(localStorage.getItem("current-category-map")));
        }

        if (localStorage.getItem("avatarSeeds")) {
            const avatarSeeds = JSON.parse(localStorage.getItem("avatarSeeds"));
            const selectedCharacters = JSON.parse(
                localStorage.getItem("selectedCharacters")
            );
            const tempArray = [];

            for (let i = 0; i < 4; i++) {
                if (selectedCharacters[i]) {
                    tempArray.push({
                        state: playerStates[i],
                        seed: avatarSeeds[selectedCharacters[i].index],
                    });
                } else {
                    tempArray.push({
                        state: { visibility: "hidden", player: i },
                        seed: `empty`,
                    });
                }
            }

            localStorage.setItem("avatars-config", JSON.stringify(tempArray));
            console.log(tempArray);
            setAvatarsConfig(tempArray);
        }
    }, []);

    useEffect(() => {
        const updateNum = turn % numberOfPlayers;

        if (!playerPosition) {
            return;
        } else {
            const oldPos = playerPosition[updateNum];
            const newPos = {
                old: oldPos.current,
                current: oldPos.current + diceState.diceNumber,
            };

            let moveVector = [0, 0];

            if (newPos.current >= totalCells) {
                // Player has reached the end of the board, hide the dice
                setShowDice(false);

                const endPos = JSON.parse(localStorage.getItem("player-position"));

                let finalPos = [];

                for (let i = 0; i < numberOfPlayers; i++) {
                    finalPos.push([i, endPos[i].current])
                }

                localStorage.setItem("final-pos", JSON.stringify(finalPos));

                console.log(finalPos);

                setGameOver(true);

            } else if (newPos.current > newPos.old) {
                moveVector = walk(newPos.old, newPos.current);
            } else {
                moveVector = [0, 0];
            }

            if (gameOver === false) {
                if (!moveVector) {
                    return;
                } else {
                    const startX = cPositions[updateNum][0];
                    const endX = startX + moveVector[0];
                    const startY = cPositions[updateNum][1];
                    const endY = startY + moveVector[1];

                    setCPositions({ ...cPositions, [updateNum]: [endX, endY] });
                    localStorage.setItem(
                        "c-positions",
                        JSON.stringify({ ...cPositions, [updateNum]: [endX, endY] })
                    );

                    const newPlayerPos = { ...playerPosition, [updateNum]: newPos };
                    setPlayerPosition(newPlayerPos);
                    localStorage.setItem("player-position", JSON.stringify(newPlayerPos));

                    const newCurrentCategory = categoryMap[newPos.current];
                    const newCurrentCategories = {
                        ...currentCategoryMap,
                        [updateNum]: newCurrentCategory,
                    };

                    setCurrentCategoryMap(newCurrentCategories);
                    localStorage.setItem(
                        "current-category-map",
                        JSON.stringify(newCurrentCategories)
                    );

                    // If the player has reached the end of the board, hide the dice
                    if (newPos.current >= totalCells) {
                        setShowDice(false);
                    }
                }
            }

        }
    }, [diceState]);

    return (
        <section>
            {(showQuestion && !gameOver) ? (
                <QuestionContainer
                    changeQuestionState={setShowQuestion}
                    changeBoardState={setShowDice}
                    setRollState={setRollState}
                    turn={turn}
                    playerTurn={playerTurn}
                    setTurn={setTurn}
                    setPlayerTurn={setPlayerTurn}
                    numberOfPlayers={numberOfPlayers}
                    currentCategoryMap={currentCategoryMap}
                />
            ) : (
                <Dicee
                    setParentDiceState={setDiceState}
                    setPlayerPosition={setPlayerPosition}
                    currentPosition={playerPosition}
                    setCPositions={setCPositions}
                    setPlayerTurn={setPlayerTurn}
                    playerTurn={playerTurn}
                    setTurn={setTurn}
                    numberOfPlayers={numberOfPlayers}
                    turn={turn}
                    changeQuestionState={setShowQuestion}
                    changeBoardState={setShowDice}
                    rollState={rollState}
                    setRollState={setRollState}
                />
            )}

            {gameOver ?
                <div>
                    <NavLink
                        to="/podium"
                        // onClick={handleGameOver}
                    > Go to Results </NavLink>

                </div>
                :
                ""}
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
                {cPositions
                    ? avatarsConfig.map(({ state, seed }) => (
                        <AnimatedAvatar
                            left={cPositions[state.player][0]}
                            top={cPositions[state.player][1]}
                            visibility={state.visibility}
                            key={state.player}
                            seed={seed}
                        />
                    ))
                    : null}
            </div>
        </section>
    );
};

export default MainBoard;