import React, { useState } from "react";
import "./App.css";
import Start from "./Start";
import Game from "./Game";
import playerFactory from "../data/player"
import gameboardFactory from "../data/gameboard"

const newPlayerBoard = gameboardFactory();
const newplayer = playerFactory(newPlayerBoard);
newplayer.board.setBoardCoordinates();

const newCPUBoard = gameboardFactory();
const newCPU = playerFactory(newCPUBoard);
newCPU.board.setBoardCoordinates();

function App() {
  const [player, setPlayer] = useState(newplayer);
  const [CPU, setCPU] = useState(newCPU);

  const [showStart, setShowStart] = useState(true);
  const [showGame, setShowGame] = useState(false);

  const toggleStart = () => {
    //closes the start screen and shows the game screen
    setShowStart(!showStart);
    setShowGame(!showGame);
  };

  const handlePlayerAttack = (targetX, targetY) => {
    //takes a pair of coordinates and attacks opponent board 1);
    let tempPlayer = player;
    let tempCPU = CPU;
    tempPlayer.playerAttack(targetX, targetY, tempCPU); 

    // console.log(targetX, targetY);
    // let atkIndex = tempCPU.board.boardCoordinates.findIndex(
    // (coord) => coord.pos.x === targetX && coord.pos.y === targetY);
    // console.log(tempCPU.board.boardCoordinates[atkIndex]);

    setCPU({...tempCPU}); 
  };

  const handleCPUAttack = (targetX, targetY) => {
    //takes a pair of coordinates and attacks opponent board
    let tempPlayer = player;
    let tempCPU = CPU;
    tempCPU.aiAttack(tempPlayer)
    setPlayer({...tempPlayer});
  };



  return (
    <div className="App">
      {showStart && <Start onToggleStart={toggleStart} />}
      {showGame && <Game player={player} CPU={CPU} handlePlayerAttack={handlePlayerAttack} handleCPUAttack={handleCPUAttack}/>}
    </div>
  );
}

export default App;
