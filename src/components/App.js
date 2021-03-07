import React, { useState } from "react";
import "./App.css";
import Start from "./Start";
import ShipPlacement from "./ShipPlacement";
import Game from "./Game";
import { Restart } from "./Game";
import Result from "./Result";
import game_controller from "../game-controller";
import miss from "../sounds/splash2.flac";
import hit from "../sounds/cannonshot 8bit.wav";
import sunk from "../sounds/explode 8bit.wav";
import win_sound from "../sounds/win.wav";
import lose_sound from "../sounds/lose.wav";
import start from "../sounds/start game.ogg";




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
    playSound("start");
  };

  const toggleRestart = () => {
    //opens or closes the restart screen
    setShowRestart(!showRestart);
  };

  const toggleTurn = () => {
    //sets turn to either cpu or player to determine who will attack
    if (turn === "cpu") setTurn("player");
    else setTurn("cpu");
  };

  const toggleResult = () => {
    //hide or show the winner/results screen
    setShowResult(!showResult);
  };

  const handlePlaceShip = (type, length, coords) => {
    //adds a ship on the player's board after drag and dropping from the ship selection screen
    let tempPlayer = player;
    tempPlayer.board.placeShip(type, parseInt(length), coords);
    setPlayer({ ...tempPlayer });
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
    //takes a pair of coordinates and attacks cpu board
    let tempPlayer = player;
    let tempCPU = CPU;
    let recordResult = tempPlayer.playerAttack(targetX, targetY, tempCPU);

    setCPU({ ...tempCPU });
    if (recordResult.result === "miss") toggleTurn();
  
    //if all cpu ships are sunk show player win
    if (tempCPU.board.reportShips()) {
      console.log("GAME OVER: You Win!");
      setWinner("player");
      playSound("win");
      return toggleResult();
    } else {
      playSound(recordResult.result);
    }
  };

  const handleCPUAttack = () => {
    //cpu attacks player board
    let tempPlayer = player;
    let tempCPU = CPU;
    let recordResult = tempCPU.aiAttackImproved(tempPlayer);
    

    setTimeout(() => {
    //if all player ships are sunk show cpu win
      if (recordResult.result === "miss") toggleTurn();
      setPlayer({ ...tempPlayer });
      if (tempPlayer.board.reportShips()) {
        toggleTurn();
        console.log("GAME OVER: CPU Win!");
        setWinner("cpu");
        playSound("lose");
        return toggleResult();
      } else {
       playSound(recordResult.result);
      }
    }, 1500);
  };

  const handleRestartGame = () => {
    //reset player boards
    game_controller.resetGame();

    //toggle start screen and game screen
    setShowStart(!showStart);
    setShowGame(!showGame);
    if (showRestart) setShowRestart(!showRestart);
    if (showResult) setShowResult(!showResult);
  };

  const playSound = (result) => {
    let audio = document.createElement("audio");
    switch (result) {
      case "miss":
        audio.src = miss;
        audio.volume = 0.2;
        break;
      case "hit":
        audio.src = hit;
        break;
      case "sunk":
        audio.src = sunk;
        break;
      case "win":
        audio.src = win_sound;
        break;
      case "lose":
        audio.src = lose_sound;
        break; 
      case "start":
        audio.src = start;
        break; 
      default:
    }
    if (!audio) return;
    console.log(audio);
    audio.currentTime = 0;
    audio.play();
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
      {showRestart && (
        <Restart
          onToggleRestart={toggleRestart}
          handleRestartGame={handleRestartGame}
        />
      )}
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
