import React, { useState } from "react";
import "./App.css";
import Start from "./Start";
import ShipPlacement from "./ShipPlacement";
import Game from "./Game";
import Result from "./Result";
import game_controller from "../game-controller";

/***component below***/

function App() {
  const [turn, setTurn] = useState(game_controller.turn);
  const [player, setPlayer] = useState(game_controller.Player);
  const [CPU, setCPU] = useState(game_controller.CPU);

  const [showStart, setShowStart] = useState(true);
  const [showShipPlacement, setShowShipPlacement] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winner, setWinner] = useState("none");

  const toggleStart = () => {
    //closes the start screen and shows the game screen
    setShowShipPlacement(!showShipPlacement);
    setShowStart(!showStart);
    game_controller.start();

  };

  
  const toggleResult = () => {
    //closes the start screen and shows the game screen
    setShowResult(!showResult);
  };

  const handlePlaceShip = (type, length, coords) => {
    //adds a ship on the player's board after drag and dropping from the ship selection scren
    let tempPlayer = player;
    tempPlayer.board.placeShip(type, length, coords);
    setPlayer({...tempPlayer});
  }

  

  const onDoneShipPlacement = () => {
    //closes ship placement screen and shows game screen
    setShowShipPlacement(!showShipPlacement);
    setShowGame(!showGame);
    game_controller.randomizeShips();
  };

  const handlePlayerAttack = (targetX, targetY) => {
    //takes a pair of coordinates and attacks opponent board 1);
    let tempPlayer = player;
    let tempCPU = CPU;
    tempPlayer.playerAttack(targetX, targetY, tempCPU);

    // console.log(tempCPU.board.reportShips());

    // console.log(targetX, targetY);
    // let atkIndex = tempCPU.board.boardCoordinates.findIndex(
    // (coord) => coord.pos.x === targetX && coord.pos.y === targetY);
    // console.log(tempCPU.board.boardCoordinates[atkIndex]);

    setCPU({ ...tempCPU });
    setTurn("cpu");

    if (tempCPU.board.reportShips()) {
      console.log("GAME OVER: You Win!");
      setWinner("player");
      return toggleResult();
    }
  };

  const handleCPUAttack = () => {
    //takes a pair of coordinates and attacks opponent board

    let tempPlayer = player;
    let tempCPU = CPU;
    tempCPU.aiAttack(tempPlayer);

    setTimeout(() => {
      toggleTurn();
      setPlayer({ ...tempPlayer });

      if (tempPlayer.board.reportShips()) {
        console.log("GAME OVER: CPU Win!");
        setWinner("cpu");

        return toggleResult();
      }
    }, 0);
  };

  const handleRestartGame = () => {
    //reset player boards

    game_controller.resetGame();
    // setPlayer(game_controller.Player);
    // setCPU(game_controller.CPU);
    //toggle start screen and game screen

    setShowStart(!showStart);
    setShowGame(!showGame);
    setShowResult(!showResult);
  };

  const toggleTurn = () => {
    if (turn === "cpu") setTurn("player");
    else setTurn("cpu");
  };

  return (
    <div className="App">
      {showResult && (
        <Result winner={winner} handleRestartGame={handleRestartGame} />
      )}
      {showShipPlacement && <ShipPlacement player={player} handlePlaceShip={handlePlaceShip} onDoneShipPlacement={onDoneShipPlacement} />}
      {showStart && <Start onToggleStart={toggleStart} />}

      {showGame && (
        <Game
          player={player}
          CPU={CPU}
          turn={turn}
          toggleTurn={toggleTurn}
          handlePlayerAttack={handlePlayerAttack}
          handleCPUAttack={handleCPUAttack}
          toggleResult={toggleResult}
        />
      )}
    </div>
  );
}

export default App;
