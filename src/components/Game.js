import React from "react";
import "./Game.css";

function Panel() {
    return (
        <div className="Panel"/>
    );
}

function Game({player, CPU}) {
  return (
    <div className="Game">
      <h1 className="logo">BATTLESHIP</h1>
      <div className="status_container">
        <div className="status_box">Your turn</div>
      </div>
      <div className="board_container">
        <div className="player_container">
          <p>Player</p>
          <div className="board player_board">
            {player.board.boardCoordinates.map((coord, i) => <Panel key={i} />)}
          </div>
        </div>
        <div className="cpu_container">
          <p>CPU</p>
          <div className="board cpu_board">
            {CPU.board.boardCoordinates.map((coord, i) => <Panel key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
