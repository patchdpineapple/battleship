import React from "react";
import "./Result.css";

function Result({winner, handleRestartGame}) {
  
  return (
    <div className="Result">
      <div className="Result_container">
        <strong>{ winner === "player" ? "Good job! You win!" : "Game over. CPU wins."}</strong>
        <button className="btn" onClick={handleRestartGame}>Play again</button>
      </div>
    </div>
  );
}

export default Result;
