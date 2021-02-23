import React, { useEffect } from "react";
import "./Game.css";

function Panel({ type, handlePlayerAttack, handleCPUAttack, coords, ship, status }) {
  const onPlayerAttack = () => {
    handlePlayerAttack(coords.x, coords.y);
  };

  // return (
  //   <>
  //      {/* {status === "hit" ?
  //     <button className="Panel hit">x</button>
  //     : status === "miss" ?
  //     <button className="Panel miss">o</button>
  //     : <button className="Panel" onClick={onPlayerAttack}></button>  */}

  //   {console.log(status)}
  //     <button className={`Panel ${status === "miss" ? "miss" : null}`} onClick={onPlayerAttack}>X</button>

  //   </>
  // );


  if (ship) {
    return (
      <>
        {status === "hit" ? <button className="Panel ship hit">x</button> : null}
        {status === null ? (
          <button className="Panel ship" onClick={()=>{
            if(type === "cpu"){
              return onPlayerAttack();
            }else {
              return console.log(ship, coords.x, coords.y);
            }
          }} />
        ) : null}
      </>
    );
  } else {
    return (
      <>
        {status === "miss" ? <button className="Panel miss">-</button> : null}
        {status === null ? (
          <button className="Panel" onClick={()=>{
            if(type === "cpu"){
              return onPlayerAttack();
            }else {
              return console.log(ship, coords.x, coords.y);
            }
          }} />
        ) : null}
      </>
    );
  }
}

function Game({ player, CPU, handlePlayerAttack }) {
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
                type="player"
                coords={coord.pos}
                ship={coord.ship}
                status={coord.status}
              />
            ))}
          </div>
        </div>
        <div className="status_container">
          <div className="status_box">Your turn</div>
        </div>
        <div className="cpu_container">
          <p style={{ fontSize: "30px" }}>CPU</p>
          <div className="board cpu_board">
            {CPU.board.boardCoordinates.map((coord, i) => (
              <Panel
                key={i}
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
