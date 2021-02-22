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

  return (
    <div className="App">
      {showStart && <Start onToggleStart={toggleStart} />}
      {showGame && <Game player={player} CPU={CPU}/>}
    </div>
  );
}

export default App;
