import React, { useState } from "react";
import "./ShipPlacement.css";

function DragShip({ id, type, length }) {
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [isDropped, setIsDropped] = useState(false);

  const toggleAxis = () => {
    setIsHorizontal(!isHorizontal);
  };

  const dragStart = e => {
    const target = e.target;
    console.log(target.id, type);
    e.dataTransfer.setData("ship_type", type);
    e.dataTransfer.setData("ship_length", length.length);
    e.dataTransfer.setData("ship_axis", isHorizontal ? "horizontal" : "vertical");


  }

  const dragOver = e => {
      e.stopPropagation();
      
  }

  const dragEnd = e => {
    e.stopPropagation();
    // setIsDropped(true);
}

  return (
    
    <>
    {isDropped ? <div/> 
    :<div
    id={id}
    type={type}
    length={length.length}
     className={`DragShip ${isHorizontal ? "horizontal" : "vertical"}`}
     onClick={toggleAxis}
     draggable={true}
     onDragStart={dragStart}
     onDragOver={dragOver}
     onDragEnd={dragEnd}

   >
     {length.map((x, i) => (
       <div key={i} className="selectShip"></div>
     ))}
   </div> }
    </>
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

function DropPanel({ player, ship, coords }) {
  const [isDropped, setIsDropped] = useState(false);

  const dragOver = e => {
    e.preventDefault();
    e.target.classList.add('draggingOver');
    console.log(`dragging over coord ${coords.x},${coords.y}`);
    
}

const dragLeave = e => {
  e.preventDefault();
  e.target.classList.remove('draggingOver');
  
}

 const drop = e => {
  let ship_type = e.dataTransfer.getData("ship_type");
  let ship_length = e.dataTransfer.getData("ship_length");
  let ship_axis = e.dataTransfer.getData("ship_axis");

  let ship_baseIndex = player.board.boardCoordinates.findIndex(
    (coord) => coord.pos.x === coords.x && coord.pos.y === coords.y
  );
  console.log(`dropped data: ${ship_type}, length: ${ship_length}, axis: ${ship_axis}, baseCoord: ${"x:"+coords.x},${"y:"+coords.y}, index: ${ship_baseIndex}`);
  e.target.classList.remove('draggingOver');

 }

  return <button className={`DropPanel ${isDropped ? "dropped":null}`} onDrop={drop} onDragOver={dragOver} onDragLeave={dragLeave}></button>;
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
        <DropPanel key={i} player={player} ship={coord.ship} coords={coord.pos} />
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
