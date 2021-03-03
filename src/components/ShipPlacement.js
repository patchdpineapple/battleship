import React, { useState } from "react";
import "./ShipPlacement.css";

let drop_status = "valid";

function DragShip(props) {
  const [isHorizontal, setIsHorizontal] = useState(true);

  const toggleAxis = () => {
    setIsHorizontal(!isHorizontal);
  };

  const dragStart = (e) => {
    e.target.style.opacity = "0.4";

    // console.log(target.id, type);
    e.dataTransfer.setData("ship_type", props.type);
    e.dataTransfer.setData("ship_length", props.length.length);
    e.dataTransfer.setData(
      "ship_axis",
      isHorizontal ? "horizontal" : "vertical"
    );
    e.dataTransfer.effectAllowed = "move";
  };

  

  const dragEnd = (e) => {
    e.stopPropagation();
    e.target.style.opacity = "1";

    console.log(`drag end drop class: ${e.target.className}`);
    console.log(`drag end drop effect value : ${e.dataTransfer.dropEffect}`);
    if(drop_status !== "invalid"){
      if(e.dataTransfer.dropEffect === "move") props.unshow();
    }
    

    
  };

  

  return (
    <>
      {props.show ? (
        <div
        id={props.id}
        type={props.type}
        length={props.length.length}
        className={`DragShip ${isHorizontal ? "horizontal" : "vertical"}`}
        onClick={toggleAxis}
        draggable={true}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        
      >
        {props.length.map((x, i) => (
          <div key={i} className="selectShip"></div>
        ))}
      </div>
      ) : (
        <div/>
      )}
    </>
  );
}

function ShipSelection(props) {
  return (
    <div className="ShipSelection">
      <DragShip id={1} type="Patrol" length={[1, 2]} show={props.showPatrol} unshow={props.handleUnshowPatrol} />
      <DragShip id={2} type="Submarine" length={[1, 2, 3]} show={props.showSubmarine} unshow={props.handleUnshowSubmarine} />
      <DragShip id={3} type="Destroyer" length={[1, 2, 3]} show={props.showDestroyer} unshow={props.handleUnshowDestroyer} />
      <DragShip id={4} type="Battleship" length={[1, 2, 3, 4]} show={props.showBattleship} unshow={props.handleUnshowBattleship} />
      <DragShip id={5} type="Carrier" length={[1, 2, 3, 4, 5]} show={props.showCarrier} unshow={props.handleUnshowCarrier} />
    </div>
  );
}

function DropPanel({ index, player, ship, coords, handlePlaceShip }) {

  const dragOver = (e) => {
    //show hover over color
    e.preventDefault();
    e.target.classList.add("draggingOver");
  };

  const dragLeave = (e) => {
    //remove hovered over color
    e.preventDefault();
    e.target.classList.remove("draggingOver");
  };

  const drop = (e) => {
    e.preventDefault();
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
      // console.clear();
      // console.log(shipCoords);
      // for (let i = 0; i < ship_length; i++) {
      //   console.log(
      //     `coord ${i + 1}: ${shipCoords[i].pos.x},${shipCoords[i].pos.y}`
      //   );
      // }
      drop_status = "valid";
    handlePlaceShip(ship_type,ship_length,shipCoords);
    console.log(`onDrop class: ${e.target.classList}`);

    } else {
      console.log(shipCoords);
      drop_status = "invalid";
    }
      
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
          tempBaseIndexes += 1;
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

    if(invalid > 0 || occupied > 0) return null;

    //convert and store ship indexes as ship coordinates
    for (let i = 0; i < shipIndexesArray.length; i++) {
      shipCoords.push({
        pos: player.board.boardCoordinates[shipIndexesArray[i]].pos,
        isHit: false,
      });
    }

    return shipCoords;
  };

  return (
    <button
      className={`DropPanel ${ship ? "dropped":"not_dropped" }`}
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
          ship={coord.ship}
          coords={coord.pos}
          handlePlaceShip={handlePlaceShip}
        />
      ))}
    </div>
  );
}

function ShipPlacement({ player, handlePlaceShip, onResetShipPlacement, onDoneShipPlacement }) {
  
  const [showPatrol, setShowPatrol] = useState(true);
  const [showSubmarine, setShowSubmarine] = useState(true);
  const [showDestroyer, setShowDestroyer] = useState(true);
  const [showBattleship, setShowBattleship] = useState(true);
  const [showCarrier, setShowCarrier] = useState(true);

  const handleUnshowPatrol = () => {
    setShowPatrol(false);
  }

  const handleUnshowSubmarine = () => {
    setShowSubmarine(false);
  }

  const handleUnshowDestroyer = () => {
    setShowDestroyer(false);
  }

  const handleUnshowBattleship = () => {
    setShowBattleship(false);
  }

  const handleUnshowCarrier = () => {
    setShowCarrier(false);
  }


  const handleResetShips = () => {
    setShowPatrol(true);
    setShowSubmarine(true);
    setShowDestroyer(true);
    setShowBattleship(true);
    setShowCarrier(true);
    onResetShipPlacement();
  }

  return (
    <div className="ShipPlacement">
      <div className="ShipPlacement_container">
        <DropBoard player={player} handlePlaceShip={handlePlaceShip} />
        <ShipSelection 
        showPatrol={showPatrol} 
        handleUnshowPatrol={handleUnshowPatrol} 
        showSubmarine={showSubmarine}  
        handleUnshowSubmarine={handleUnshowSubmarine} 
        showDestroyer={showDestroyer} 
        handleUnshowDestroyer={handleUnshowDestroyer} 
        showBattleship={showBattleship} 
        handleUnshowBattleship={handleUnshowBattleship} 
        showCarrier={showCarrier} 
        handleUnshowCarrier={handleUnshowCarrier} 
        />
      </div>
      <p>Drag and Drop to place a ship on the board. Click to change ship axis.</p>
      <div>
        <button className="btn reset" onClick={handleResetShips}>Reset</button>
        <button
          className={`btn done ${player.board.ships.length !== 5 ? "btn_disabled" : ""}`}
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
