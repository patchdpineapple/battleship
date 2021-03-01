import React, { useState } from "react";
import "./ShipPlacement.css";

function DragShip({ id, type, length }) {
  const [isHorizontal, setIsHorizontal] = useState(true);

  const toggleAxis = () => {
    setIsHorizontal(!isHorizontal);
  };

  const dragStart = e => {
    const target = e.target;
    e.dataTransfer.setData("ship_id", target.id);
  }

  const dragOver = e => {
      e.stopPropagation();
  }

  return (
    <div
     id={id}
      className={`DragShip ${isHorizontal ? "horizontal" : "vertical"}`}
      onClick={toggleAxis}
      draggable={true}
      onDragStart={dragStart}
      onDragOver={dragOver}

    >
      {length.map((x, i) => (
        <div className="selectShip"></div>
      ))}
    </div>
  );
}

function ShipSelection(props) {
  return (
    <div className="ShipSelection">
      <DragShip id={1} type="Patrol" length={[1, 2]} />
      <DragShip id={2} type="Submarine" length={[1, 2, 3]} />
      <DragShip id={3} type="Destroyer" length={[1, 2, 3]} />
      <DragShip id={4} type="Battleship" length={[1, 2, 3, 4]} />
      <DragShip id={5} type="Carrier" length={[1, 2, 3, 4, 5]} />
    </div>
  );
}

function DropPanel({ coords }) {
  return <button className="DropPanel"></button>;
}

function DropBoard({ player }) {
    const drop = e => {
        e.preventDefault();
        const ship_id = e.dataTransfer.getData("ship_id");
        const ship = document.getElementById(ship_id);
        e.target.appendChild(ship);
    }

  return (
    <div id="DropBoard" className="DropBoard">
      {player.board.boardCoordinates.map((coord, i) => (
        <DropPanel key={i} coords={coord.pos} />
      ))}
    </div>
  );
}

function ShipPlacement({ player, onDoneShipPlacement }) {
  return (
    <div className="ShipPlacement">
      <div className="ShipPlacement_container">
        <DropBoard player={player} />
        <ShipSelection />
      </div>
      <p>Place your ships</p>
      <button className="btn done" onClick={onDoneShipPlacement}>
        Done
      </button>
    </div>
  );
}

export default ShipPlacement;
