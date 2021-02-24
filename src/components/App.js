import React, { useState } from "react";
import "./App.css";
import Start from "./Start";
import Game from "./Game";
import game_controller from "../game-controller"

/***component below***/

function App() {
  const [turn, setTurn] = useState(game_controller.turn)
  const [player, setPlayer] = useState(game_controller.Player);
  const [CPU, setCPU] = useState(game_controller.CPU);

  const [showStart, setShowStart] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleStart = () => {
    //closes the start screen and shows the game screen
    setShowStart(!showStart);
    setShowGame(!showGame);
    game_controller.start();
  };

  const toggleResult = () => {
    //closes the start screen and shows the game screen
    setShowResult(!showResult);
  };

  const handlePlayerAttack = (targetX, targetY) => {
    //takes a pair of coordinates and attacks opponent board 1);
    let tempPlayer = player;
    let tempCPU = CPU;
    tempPlayer.playerAttack(targetX, targetY, tempCPU); 

    // console.log(tempCPU.board.reportShips());
    if(tempCPU.board.reportShips()){
      console.log("GAME OVER: You Win!");
      toggleResult();
    }

    
    // console.log(targetX, targetY);
    // let atkIndex = tempCPU.board.boardCoordinates.findIndex(
    // (coord) => coord.pos.x === targetX && coord.pos.y === targetY);
    // console.log(tempCPU.board.boardCoordinates[atkIndex]);

    setCPU({...tempCPU}); 
    setTurn("cpu");

  };

  const handleCPUAttack = () => {
    //takes a pair of coordinates and attacks opponent board

    let tempPlayer = player;
    let tempCPU = CPU;
    tempCPU.aiAttack(tempPlayer);

    setTimeout(()=>{
    toggleTurn();
      setPlayer({...tempPlayer});
    },1500);
    
  };

  const toggleTurn = () => {
    if(turn === "cpu") setTurn("player");
    else setTurn("cpu");
  }



  return (
    <div className="App">
      {showStart && <Start onToggleStart={toggleStart} />}
      {showGame && <Game player={player} CPU={CPU} turn={turn} toggleTurn={toggleTurn} handlePlayerAttack={handlePlayerAttack} handleCPUAttack={handleCPUAttack} toggleResult={toggleResult} />}
    </div>
  );
}

export default App;
