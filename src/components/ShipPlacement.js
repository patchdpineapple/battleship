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

function DropPanel({ index, player, type, coords, handlePlaceShip }) {
  const [isDropped, setIsDropped] = useState(false);

  const dragOver = (e) => {
    //show hover over color
    e.preventDefault();
    e.target.classList.add("draggingOver");
    // console.log(`dragging over coord ${shipCoords.x},${shipCoords.y}`);
  };

  const dragLeave = (e) => {
    //remove hovered over color
    e.preventDefault();
    e.target.classList.remove("draggingOver");
  };

  const drop = (e) => {
    //remove hovered over color
    e.target.classList.remove("draggingOver");

    //returns a new 
    let ship_type = e.dataTransfer.getData("ship_type");
    let ship_length = e.dataTransfer.getData("ship_length");
    let ship_axis = e.dataTransfer.getData("ship_axis");
    let ship_baseIndex = player.board.boardCoordinates.findIndex(
      (coord) => coord.pos.x === coords.x && coord.pos.y === coords.y
    );
    console.log(
      `dropped data: ${ship_type}, length: ${ship_length}, axis: ${ship_axis}, baseCoord: ${
        "x:" + coords.x
      },${"y:" + coords.y}, shipIndex: ${ship_baseIndex}`
    );

    let shipCoords = getCoords(ship_baseIndex, ship_length, ship_axis);

    //for testing only
    if (shipCoords) {
      console.clear();
      console.log(shipCoords);
      for (let i = 0; i < ship_length; i++) {
        console.log(
          `coord ${i + 1}: ${shipCoords[i].pos.x},${shipCoords[i].pos.y}`
        );
      }
    handlePlaceShip(ship_type,ship_length,shipCoords);

    } else console.log(shipCoords);

  };

  const getCoords = (index, length, axis) => {
    //returns a valid ship coordinates array or null if invalid dropped index
    let shipIndex = index;
    let increment = 0;
    let shipIndexesArray = [];
    let shipCoords = [];
    let invalid = 0;
    let occupied = 0; 
    let invalidBaseIndexes = []; //array of all invalid base indexes(0,1,2,...,9)/(0,10,20,...,90) depending on length and axis
    let invalidIndexesArray = []; //array of all invalid indexes 

    //used to check if dropped shipIndex is invalid
    const isInvalid = (baseIndex, invalidIndexes) => {
        return invalidIndexes.findIndex((invalidIndex) => invalidIndex === baseIndex) > -1 ? true : false;
    };

    //used to check if the current shipIndex is already occupied or undefined
    const isOccupied = (baseIndex) => {
      if (typeof player.board.boardCoordinates[baseIndex] === "undefined") {
        return true;
      }

      return player.board.boardCoordinates[baseIndex].ship ? true : false;
    };

    //set increment and invalid indexes for checking if dropped index is valid
    if (axis === "horizontal") {
      increment = 1;

      //fill array with invalid lowest indexes depending on length
      for (let i = 11-length; i < 10; i++) {
        invalidBaseIndexes.push(i);
      }

      //assign all invalid indexes based on all invalid lowest indexes
      let tempBaseIndexes;
      for (let i = 0; i < invalidBaseIndexes.length; i++) {
        tempBaseIndexes = invalidBaseIndexes[i];
        for (let j = 0; j < 10; j++) {
          invalidIndexesArray.push(tempBaseIndexes);
          tempBaseIndexes += 10;
        }
      }
    } else if (axis === "vertical") {
      increment = 10;
      
      for (let i = 110-length*10; i < 100; i+=10) {
        invalidBaseIndexes.push(i);
      }

      let tempBaseIndexes;
      for (let i = 0; i < invalidBaseIndexes.length; i++) {
        tempBaseIndexes = invalidBaseIndexes[i];
        for (let j = 0; j < 10; j++) {
          invalidIndexesArray.push(tempBaseIndexes);
          tempBaseIndexes += 10;
        }
      }
    }

    //check if dropped index is an invalid(not fit for length of ship) spot to drop
    if (isInvalid(shipIndex, invalidIndexesArray)) invalid++;

    //complete ship indexes
    for (let i = 0; i < length; i++) {
      shipIndexesArray.push(shipIndex);
      if (isOccupied(shipIndex)) occupied++;
      shipIndex += increment;
    }

    //convert and store ship indexes as ship coordinates
    for (let i = 0; i < shipIndexesArray.length; i++) {
      shipCoords.push({
        pos: player.board.boardCoordinates[shipIndexesArray[i]].pos,
        isHit: false,
      });
    }

    return invalid === 0 && occupied === 0 ? shipCoords : null;
  };

  return (
    <button
      className={`DropPanel ${isDropped ? "dropped" : null}`}
      onClick={() => console.log(`shipIndex[${index}]`)}
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
          type={coord.ship}
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
