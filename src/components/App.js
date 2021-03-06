import React, { Children, useState } from "react";
import "./App.css";
import Start from "./Start";
import ShipPlacement from "./ShipPlacement";
import Game from "./Game";
import { Restart } from "./Game";
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
  const [showRestart, setShowRestart] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winner, setWinner] = useState("none");

  const toggleStart = () => {
    //closes the start screen and shows the game screen
    setShowShipPlacement(!showShipPlacement);
    setShowStart(!showStart);
    game_controller.start();
  };

  const toggleRestart = () => {
    //opens or closes the restart screen
    setShowRestart(!showRestart);
  };

  const toggleTurn = () => {
    if (turn === "cpu") setTurn("player");
    else setTurn("cpu");
  };

  const toggleResult = () => {
    //closes the start screen and shows the game screen
    setShowResult(!showResult);
  };

  const handlePlaceShip = (type, length, coords) => {
    //adds a ship on the player's board after drag and dropping from the ship selection scren
    let tempPlayer = player;

    tempPlayer.board.placeShip(type, parseInt(length), coords);
    setPlayer({ ...tempPlayer });
    // console.log('ship placed on player board');
  };

  const onResetShipPlacement = () => {
    //reset ships
    let tempPlayer = player;
    tempPlayer.board.resetBoard();
    setPlayer({ ...tempPlayer });
  };

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
    let recordResult = tempPlayer.playerAttack(targetX, targetY, tempCPU);

    // console.log(tempCPU.board.reportShips());

    // console.log(targetX, targetY);
    // let atkIndex = tempCPU.board.boardCoordinates.findIndex(
    // (coord) => coord.pos.x === targetX && coord.pos.y === targetY);
    // console.log(tempCPU.board.boardCoordinates[atkIndex]);

    setCPU({ ...tempCPU });
    if (recordResult.result === "miss") toggleTurn();

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
    let recordResult = tempCPU.aiAttackImproved(tempPlayer);

   
    setTimeout(() => {
    if(recordResult.result === "miss") toggleTurn();

      setPlayer({ ...tempPlayer });
      if (tempPlayer.board.reportShips()) {
        toggleTurn();
        console.log("GAME OVER: CPU Win!");
        setWinner("cpu");
        return toggleResult();
      } 
    }, 1000);
  };

  const handleRestartGame = () => {
    //reset player boards

    game_controller.resetGame();
    
    //toggle start screen and game screen
    setShowStart(!showStart);
    setShowGame(!showGame);
    if(showRestart) setShowRestart(!showRestart);
    if(showResult) setShowResult(!showResult);
    
  };

  return (
    <div className="App">
      {showResult && (
        <Result winner={winner} handleRestartGame={handleRestartGame} />
      )}
      {showShipPlacement && (
        <ShipPlacement
          player={player}
          handlePlaceShip={handlePlaceShip}
          onResetShipPlacement={onResetShipPlacement}
          onDoneShipPlacement={onDoneShipPlacement}
        />
      )}
      {showStart && <Start onToggleStart={toggleStart} />}
      {showRestart && <Restart onToggleRestart={toggleRestart} handleRestartGame={handleRestartGame}/>}
      {showGame && (
        <Game
          player={player}
          CPU={CPU}
          turn={turn}
          onToggleRestart={toggleRestart}
          handlePlayerAttack={handlePlayerAttack}
          handleCPUAttack={handleCPUAttack}
        />
      )}
    </div>
  );
}

export default App;
