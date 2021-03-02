import React, { useState } from "react";
import "./ShipPlacement.css";

function DragShip({ id, type, length }) {
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [isDropped, setIsDropped] = useState(false);

  const toggleAxis = () => {
    setIsHorizontal(!isHorizontal);
  };

  const dragStart = (e) => {
    const target = e.target;
    // console.log(target.id, type);
    e.dataTransfer.setData("ship_type", type);
    e.dataTransfer.setData("ship_length", length.length);
    e.dataTransfer.setData(
      "ship_axis",
      isHorizontal ? "horizontal" : "vertical"
    );
  };

  const dragOver = (e) => {
    e.stopPropagation();
  };

  const dragEnd = (e) => {
    e.stopPropagation();
    // setIsDropped(true);
  };

  return (
    <>
      {isDropped ? (
        <div />
      ) : (
        <div
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
        </div>
      )}
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

function DropPanel({ index, player, ship, coords, handlePlaceShip }) {
  const [isDropped, setIsDropped] = useState(false);

  const dragOver = (e) => {
    e.preventDefault();
    e.target.classList.add("draggingOver");
    // console.log(`dragging over coord ${coords.x},${coords.y}`);
  };

  const dragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove("draggingOver");
  };

  const drop = (e) => {
    let ship_type = e.dataTransfer.getData("ship_type");
    let ship_length = e.dataTransfer.getData("ship_length");
    let ship_axis = e.dataTransfer.getData("ship_axis");
    let ship_baseIndex = player.board.boardCoordinates.findIndex(
      (coord) => coord.pos.x === coords.x && coord.pos.y === coords.y
    );
    console.log(
      `dropped data: ${ship_type}, length: ${ship_length}, axis: ${ship_axis}, baseCoord: ${
        "x:" + coords.x
      },${"y:" + coords.y}, index: ${ship_baseIndex}`
    );
    e.target.classList.remove("draggingOver");

    let shipCoords = getCoords(ship_baseIndex, ship_length, ship_axis);
    if (shipCoords) {
      // console.clear();
      // console.log(shipCoords);
      // for (let i = 0; i < ship_length; i++) {
      //   console.log(
      //     `coord ${i + 1}: ${shipCoords[i].pos.x},${shipCoords[i].pos.y}`
      //   );
      // }
    } else console.log(shipCoords);
  };

  const getCoords = (index, length, axis) => {
    let baseIndex = index;
    let increment = 0;
    let baseIndexArray = [];
    let coords = [];
    let invalid = 0;
    let invalidLowestIndexes;
    let invalidIndexesArray;

    //used to check if a coordinate is already occupied
    const isInvalid = (baseIndex, invalidIndexes) => {
      if (typeof player.board.boardCoordinates[baseIndex] === "undefined") {
        return true;
      }

      if(invalidIndexes.findIndex( index => index === baseIndex ) > -1)
      return player.board.boardCoordinates[baseIndex].ship ? true : false;
    };

    //set increment based on axis
    if (axis === "horizontal") {
      let tempIndex;
      increment = 1;
      invalidLowestIndexes = new Array(length - 1);

      for (let i = length - 1; i > 0; i++) {
        invalidLowestIndexes.push(10 - i);
      }

      //assign all invalid indexes
      for (let i = 0; i < invalidLowestIndexes.length; i++) {
        tempIndex = invalidLowestIndexes[i];
        for (let j = 0; j < 10; j++) {
          invalidIndexesArray.push(tempIndex);
          tempIndex += 10;
        }
      }
    } else if (axis === "vertical") {
      let tempIndex;
      increment = 10;
    }
    
    //complete ship indexes
    for (let i = 0; i < length; i++) {
      baseIndexArray.push(baseIndex);
      if (isInvalid(baseIndex, invalidIndexesArray)) return null;
      baseIndex += increment;
    }

    //get coordinates from the chosen indexes
    for (let i = 0; i < baseIndexArray.length; i++) {
      coords.push({
        pos: player.board.boardCoordinates[baseIndexArray[i]].pos,
        isHit: false,
      });
    }

    return coords;
  };

  return (
    <button
      className={`DropPanel ${isDropped ? "dropped" : null}`}
      onClick={() => console.log(`index[${index}]`)}
      onDrop={drop}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
    ></button>
  );
}

function DropBoard({ player, handlePlaceShip }) {
  return (
    <div id="DropBoard" className="DropBoard">
      {player.board.boardCoordinates.map((coord, i) => (
        <DropPanel
          key={i}
          index={i}
          player={player}
          ship={coord.ship}
          coords={coord.pos}
          handlePlaceShip={handlePlaceShip}
        />
      ))}
    </div>
  );
}

function ShipPlacement({ player, handlePlaceShip, onDoneShipPlacement }) {
  return (
    <div className="ShipPlacement">
      <div className="ShipPlacement_container">
        <DropBoard player={player} handlePlaceShip={handlePlaceShip} />
        <ShipSelection />
      </div>
      <p>Drag and Drop to place a ship on the board</p>
      <div>
        <button className="btn reset">Reset</button>
        <button
          className="btn done"
          onClick={onDoneShipPlacement}
          disabled={player.board.ships.length === 5 ? false : true}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export default ShipPlacement;
