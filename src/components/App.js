import React, { useState } from "react";
import "./App.css";
import Start from "./Start";
import Game from "./Game";
import playerFactory from "../data/player"
import gameboardFactory from "../data/gameboard"


/***data-create players***/
const newPlayerBoard = gameboardFactory();
const newplayer = playerFactory(newPlayerBoard);
newplayer.board.setBoardCoordinates();

const newCPUBoard = gameboardFactory();
const newCPU = playerFactory(newCPUBoard);
newCPU.board.setBoardCoordinates();

//player - manual placement of ships
newplayer.board.placeShip("Patrol", 2, [
  { pos: { x: 1, y: 1 }, isHit: false },
  { pos: { x: 2, y: 1 }, isHit: false },
]);

newplayer.board.placeShip("Submarine", 3, [
  { pos: { x: 1, y: 6 }, isHit: false },
  { pos: { x: 1, y: 7 }, isHit: false },
  { pos: { x: 1, y: 8 }, isHit: false },
]);

newplayer.board.placeShip("Destroyer", 3, [
  { pos: { x: 6, y: 10 }, isHit: false },
  { pos: { x: 7, y: 10 }, isHit: false },
  { pos: { x: 8, y: 10 }, isHit: false },
]);

newplayer.board.placeShip("BattleShip", 4, [
  { pos: { x: 4, y: 5 }, isHit: false },
  { pos: { x: 5, y: 5 }, isHit: false },
  { pos: { x: 6, y: 5 }, isHit: false },
  { pos: { x: 7, y: 5 }, isHit: false },
]);

newplayer.board.placeShip("Carrier", 5, [
  { pos: { x: 10, y: 2 }, isHit: false },
  { pos: { x: 10, y: 3 }, isHit: false },
  { pos: { x: 10, y: 4 }, isHit: false },
  { pos: { x: 10, y: 5 }, isHit: false },
  { pos: { x: 10, y: 6 }, isHit: false },
]);

//cpu - manual placement of ships
newCPU.board.placeShip("Patrol", 2, [
  { pos: { x: 1, y: 1 }, isHit: false },
  { pos: { x: 2, y: 1 }, isHit: false },
]);

newCPU.board.placeShip("Submarine", 3, [
  { pos: { x: 1, y: 6 }, isHit: false },
  { pos: { x: 1, y: 7 }, isHit: false },
  { pos: { x: 1, y: 8 }, isHit: false },
]);

newCPU.board.placeShip("Destroyer", 3, [
  { pos: { x: 6, y: 10 }, isHit: false },
  { pos: { x: 7, y: 10 }, isHit: false },
  { pos: { x: 8, y: 10 }, isHit: false },
]);

newCPU.board.placeShip("BattleShip", 4, [
  { pos: { x: 4, y: 5 }, isHit: false },
  { pos: { x: 5, y: 5 }, isHit: false },
  { pos: { x: 6, y: 5 }, isHit: false },
  { pos: { x: 7, y: 5 }, isHit: false },
]);

newCPU.board.placeShip("Carrier", 5, [
  { pos: { x: 10, y: 2 }, isHit: false },
  { pos: { x: 10, y: 3 }, isHit: false },
  { pos: { x: 10, y: 4 }, isHit: false },
  { pos: { x: 10, y: 5 }, isHit: false },
  { pos: { x: 10, y: 6 }, isHit: false },
]);

/***component below***/

function App() {
  const [player, setPlayer] = useState(newplayer);
  const [CPU, setCPU] = useState(newCPU);

  const [showStart, setShowStart] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const toggleStart = () => {
    //closes the start screen and shows the game screen
    setShowStart(!showStart);
    setShowGame(!showGame);
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
      {showGame && <Game player={player} CPU={CPU} handlePlayerAttack={handlePlayerAttack} handleCPUAttack={handleCPUAttack} toggleResult={toggleResult} />}
    </div>
  );
}

export default App;
