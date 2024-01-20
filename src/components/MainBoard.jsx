import React, { useEffect, useState } from "react";
import Square from "./Square";
import Character from "./Character";
import Dicee from "./Dicee";
import QuestionContainer from "./QuestionContainer";

const MainBoard = ({ changeBoardState }) => {
  const [showQuestion, setShowQuestion] = useState(true);

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const numberOfPlayers = 4;

  const [totalHeight, setTotalHeight] = useState(0);

  const [totalWidth, setTotalWidth] = useState(0);

  const [cornerArrays, setCornerArrays] = useState([]);

  const [colorMap, setColorMap] = useState(["white"]);

  const [cPositions, setCPositions] = useState({
    0: [0, 0],
    1: [0, 0],
    2: [0, 0],
    3: [0, 0],
  });

  const [diceState, setDiceState] = useState({
    rollNumber: 0,
    diceNumber: 1,
  });

  const [playerPosition, setPlayerPosition] = useState({
    0: {
      old: 1,
      current: 1,
    },
    1: {
      old: 1,
      current: 1,
    },
    2: {
      old: 1,
      current: 1,
    },
    3: {
      old: 1,
      current: 1,
    },
  });

  const [playerTurn, setPlayerTurn] = useState(0);
  const [turn, setTurn] = useState(0);

  const [playerStates, setPlayerStates] = useState([
    { visibility: "visible", player: 0 },
    { visibility: "visible", player: 1 },
    { visibility: "visible", player: 2 },
    { visibility: "visible", player: 3 },
  ]);

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
    // const gameBoardContainer = document.getElementById("game-board-container");

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

      tempMap = { ...tempMap, [`${squareId}`]: [rowNum * 120, colNum * 120] };
    }

    setCornerArrays(Object.entries(tempMap));
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowSize]);

  useEffect(() => {
    let tempColorMap = ["white"];

    const colors = ["green", "red", "lightblue", "grey", "yellow"]; //adapt as necessary

    for (let i = 0; i < 100; i++) {
      tempColorMap.push(colors[Math.floor(Math.random() * 5)]);
    }

    setColorMap(tempColorMap);
  }, []);

  useEffect(() => {
    const updateNum = playerTurn;
    if (
      !walk(playerPosition[updateNum].old, playerPosition[updateNum].current)
    ) {
      return;
    } else {
      let moveVector;
      if (playerPosition[updateNum].current >= 90) {
        moveVector = walk(playerPosition[updateNum].old, 90);
      } else {
        moveVector = walk(
          playerPosition[updateNum].old,
          playerPosition[updateNum].current
        );
      }

      const startX = cPositions[updateNum][0];
      const endX = startX + moveVector[1];
      const startY = cPositions[updateNum][1];
      const endY = startY + moveVector[0];

      setCPositions({ ...cPositions, [updateNum]: [endX, endY] });
    }
    setTurn(turn + 1);
    setPlayerTurn((turn + 1) % numberOfPlayers);

    console.log(turn, playerTurn);
  }, [playerPosition]);

  function step(startPos) {
    if (cornerArrays.length === 0) {
      return;
    } else {
      const startSq = cornerArrays[startPos - 1][1];
      const nextSq = cornerArrays[startPos][1];

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

  return (
    <section>
      {showQuestion ? (
        <QuestionContainer
          changeQuestionState={setShowQuestion}
          changeBoardState={changeBoardState}
        />
      ) : null}
      <Dicee
        setParentDiceState={setDiceState}
        setPlayerPosition={setPlayerPosition}
        currentPosition={playerPosition}
        playerTurn={playerTurn}
        turn={turn}
      />
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
            top={item[1][0]}
            left={item[1][1]}
            color={colorMap[item[0]]}
          />
        ))}
        {playerStates.map(({ visibility, player }) => (
          <Character
            top={cPositions[player][1]}
            left={cPositions[player][0]}
            visibility={visibility}
            key={player}
          />
        ))}
      </div>
    </section>
  );
};

export default MainBoard;
