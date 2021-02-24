import React from "react";
import "./Result.css";

function Result() {
  return (
    <div className="Result">
      <div className="Result_container">
        <strong>Game Over!</strong>
        <button className="btn">Play again</button>
      </div>
    </div>
  );
}

export default Result;
