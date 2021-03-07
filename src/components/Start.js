import React from "react";
import "./Start.css";

function Start({ onToggleStart }) {
  return (
    <div className="Start">
      <strong>BATTLESHIP</strong>
      <p>by Patchdpineapple</p>
      <button className="btn" onClick={onToggleStart}>
        START GAME
      </button>
    </div>
  );
}

export default Start;
