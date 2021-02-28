import React, { useEffect } from "react";
import "./Game.css";

function Panel({
  index,
  turn,
  type,
  handlePlayerAttack,
  coords,
  ship,
  status,
}) {
  const onPlayerAttack = () => {
    handlePlayerAttack(coords.x, coords.y);
  }
    
  if (ship) {
    return (
      <>
        {status === "sunk" ? <button className="Panel sunk" >x</button> : null}
        {status === "hit" ? (
          <button className={`Panel hit ${type === "player" ? "ship" : "ship"}`}>
            x
          </button>
        ) : null}
        {status === null ? (
          <button
            className={`Panel ${type === "player" ? "ship" : "ship"}`}
            onClick={() => {
              if (type === "cpu" && turn === "player") {
                return onPlayerAttack();
              } else {
                return console.log(`${ship}[${coords.x},${coords.y}] index[${index}]`);
              }
            }}
          />
        ) : null}
      </>
    );
  } else {
    return (
      <>
        {status === "miss" ? <button className="Panel miss">-</button> : null}
        {status === null ? (
          <button
            className="Panel"
            onClick={() => {
              if (type === "cpu" && turn === "player") {
                return onPlayerAttack();
              } else {
                return console.log(`${ship}[${coords.x},${coords.y}] index[${index}]`);
              }
            }}
          />
        ) : null}
      </>
    );
  }
}

function Game({
  player,
  CPU,
  turn,
  toggleTurn,
  handlePlayerAttack,
  handleCPUAttack,
  toggleResult,
}) {
  useEffect(
    //checks if it is cpu's turn and attacks player's board
    () => {
      if (turn === "cpu") {
        handleCPUAttack();
      }
    },
    [handleCPUAttack, turn]
  );

  return (
    <div className="Game">
      <h1 className="logo">BATTLESHIP</h1>
      <div className="board_container">
        <div className="player_container">
          <p style={{ fontSize: "30px" }}>Player</p>
          <div className="board player_board">
            {player.board.boardCoordinates.map((coord, i) => (
              <Panel
                key={i}
                index={i}
                type="player"
                coords={coord.pos}
                ship={coord.ship}
                status={coord.status}
              />
            ))}
          </div>
        </div>
        <div className="status_container">
          <div className="status_box">
            {turn === "player" ? "Player turn" : "CPU is attacking"}
          </div>
        </div>
        <div className="cpu_container">
          <p style={{ fontSize: "30px" }}>CPU</p>
          <div className="board cpu_board">
            {CPU.board.boardCoordinates.map((coord, i) => (
              <Panel
                key={i}
                index={i}
                turn={turn}
                type="cpu"
                handlePlayerAttack={handlePlayerAttack}
                coords={coord.pos}
                ship={coord.ship}
                status={coord.status}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;
