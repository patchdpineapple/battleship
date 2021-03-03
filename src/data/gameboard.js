import shipFactory from "./ship";

const gameboardFactory = () => {
  /* board coordinates sample = [
    {pos: { x: 1, y: 1 }, ship: null, isAttacked: false, status: "hit"},
    {pos: { x: 1, y: 2 }, ship: 'Patrol', isAttacked: false, status: "hit"}
    {pos: { x: 1, y: 3 }, ship: 'Patrol', isAttacked: true, status: "hit"}
    {pos: { x: 1, y: 4 }, ship: null, isAttacked: true, status: "miss"}
  ]
  */
  let boardCoordinates = [];

  let ships = []; /*
  [
    { type: 'Patrol', length: 2, 
  coords:  
   [ { pos: { x: 1, y: 1 },, isHit: false }, 
     { pos: { x: 1, y: 2 }, isHit: false } ], 
  hit: [λ: hit], 
  isSunk: [λ: isSunk] } 
}
  ] 
  */

  const setBoardCoordinates = () => {
    //this method sets the gameboard coordinates and adds the ship coordinates to gameboard
    if (boardCoordinates.length === 0) {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
          boardCoordinates.push({
            pos: { x: j, y: i },
            ship: null,
            isAttacked: false,
            status: null,
          });
        }
      }
    }
  };

  const placeShip = (type, length, coords) => {
    //places a new ship with the specified type, length and coords onto the board
    const newShip = shipFactory(type, length, coords);
    ships.push(newShip);
    newShip.coords.map((coord) => {
      let x = coord.pos.x;
      let y = coord.pos.y;
      let tempCoord = boardCoordinates.findIndex(
        (coord) => coord.pos.x === x && coord.pos.y === y
      );
      boardCoordinates[tempCoord].ship = newShip.type;
      return coord;
    });
    return "ship placed";
  };

  const randomizeShip = () => {
    //places all ships randomly on the board
    const generateRandomShips = () => {
      let randCoords;

      randCoords = randomizeCoords(5);
      placeShip("Carrier", 5, randCoords);

      randCoords = randomizeCoords(4);
      placeShip("Battleship", 4, randCoords);

      randCoords = randomizeCoords(3);
      placeShip("Submarine", 3, randCoords);

      randCoords = randomizeCoords(3);
      placeShip("Destroyer", 3, randCoords);

      randCoords = randomizeCoords(2);
      placeShip("Patrol", 2, randCoords);
    };

    //generate random coords
    const randomizeCoords = (length) => {
      let baseArray, minIndex, maxIndex, baseRandIndex;
      // let baseIndex = Math.floor(Math.random() * (10 - (length - 1)));
      let randIndexArray = [];
      let coords = [];
      let increment = 0; //1 if horizontal, 10 if vertical
      let shipsOccupied = 0; //should be 0 if there is no ship on selected coordinates
      let adjacentOccupied = false; //should be 0 if there is no ship on adjacent sides of coords

      const randomizeAxis = () => {
        return Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";
      };
      let axis = randomizeAxis();

      if (axis === "horizontal") {
        increment = 1;
        baseArray = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
        minIndex = baseArray[Math.floor(Math.random() * 10)];
        maxIndex = minIndex + (10 - length);
        baseRandIndex = getRndInteger(minIndex, maxIndex + 1);
      } else if (axis === "vertical") {
        increment = 10;
        baseArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        minIndex = baseArray[Math.floor(Math.random() * 10)];
        maxIndex = minIndex + 10 * length;
        baseRandIndex = getRndInteger(minIndex, maxIndex + 1);
        let tempVerticalIndex = [];
        for (let i = minIndex; i <= maxIndex; i += 10) {
          tempVerticalIndex.push(i);
        }
        baseRandIndex =
          tempVerticalIndex[
            Math.floor(Math.random() * tempVerticalIndex.length)
          ];
      }

      //complete ship indexes
      for (let i = 0; i < length; i++) {
        randIndexArray.push(baseRandIndex);
        if (isOccupied(baseRandIndex)) shipsOccupied++;
        baseRandIndex += increment;
      }

      //check adjacent if occupied by ships
      const checkAdjacent = () => {
        if (axis === "horizontal") {
          for (let i = 0; i < randIndexArray.length; i++) {
            if (i === 0) {
              //check up, down, left, upper left,lower left indexes for ships
              if (
                isOccupied(randIndexArray[i] - 10) ||
                isOccupied(randIndexArray[i] + 10) ||
                isOccupied(randIndexArray[i] - 1) ||
                isOccupied(randIndexArray[i] - 11) ||
                isOccupied(randIndexArray[i] + 9)
              )
                adjacentOccupied = true;
            } else if (i === randIndexArray.length - 1) {
              //check up, down, right, upper right,lower right indexes for ships
              if (
                isOccupied(randIndexArray[i] - 10) ||
                isOccupied(randIndexArray[i] + 10) ||
                isOccupied(randIndexArray[i] + 1) ||
                isOccupied(randIndexArray[i] - 9) ||
                isOccupied(randIndexArray[i] + 11)
              )
                adjacentOccupied = true;
            } else {
              isOccupied(randIndexArray[i] - 10);
              isOccupied(randIndexArray[i] + 10);
            }
          }
        } else if (axis === "vertical") {
          for (let i = 0; i < randIndexArray; i++) {
            if (i === 0) {
              //check left, right, up, upper left, upper right indexes for ships
              if (
                isOccupied(randIndexArray[i] - 1) ||
                isOccupied(randIndexArray[i] + 1) ||
                isOccupied(randIndexArray[i] - 10) ||
                isOccupied(randIndexArray[i] - 11) ||
                isOccupied(randIndexArray[i] - 9)
              )
                adjacentOccupied = true;
            } else if (i === randIndexArray.length - 1) {
              //check left, right, down, lower left, lower right indexes for ships
              if (
                isOccupied(randIndexArray[i] - 1) ||
                isOccupied(randIndexArray[i] + 1) ||
                isOccupied(randIndexArray[i] + 10) ||
                isOccupied(randIndexArray[i] + 9) ||
                isOccupied(randIndexArray[i] + 11)
              )
                adjacentOccupied = true;
            } else {
              isOccupied(randIndexArray[i] - 1);
              isOccupied(randIndexArray[i] + 1);
            }
          }
        }
      };

      checkAdjacent();

      //get coordinates from the chosen indexes
      for (let i = 0; i < randIndexArray.length; i++) {
        coords.push({
          pos: boardCoordinates[randIndexArray[i]].pos,
          isHit: false,
        });
      }

      //returns a random integer between min-max(min inclusive)
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      return shipsOccupied === 0 && adjacentOccupied === false
        ? coords
        : randomizeCoords(length);
    };

    //check if occupied
    const isOccupied = (index) => {
      if (typeof boardCoordinates[index] === "undefined") {
        console.log(boardCoordinates[index]);
        return false;
      }

      return boardCoordinates[index].ship ? true : false;
    };

    //generate random ships
    generateRandomShips();
  };

  const receiveAttack = (targetX, targetY) => {
    //takes a coordinate and determines whether or not the attack hit a ship. also records misses
    let recordResult = "";
    boardCoordinates.forEach((coord) => {
      if (coord.pos.x === targetX && coord.pos.y === targetY) {
        coord.isAttacked = true;
        if (coord.ship === null) {
          recordResult = coord.status = "miss";
        } else {
          recordResult = coord.status = "hit";
          //find the ship and update the same coord's hit status to true
          ships.forEach((ship) => {
            if (ship.type === coord.ship) {
              ship.hit(targetX, targetY);
              if (ship.isSunk()) recordResult = "sunk";
            }
          });
        }
      }
    });

    //update all sunk coordinates satus to 'sunk'
    updateToSunk();
    return recordResult;
  };

  const updateToSunk = () => {
    //checks for all ships that are sunk and updates board coordinates that has the sunk ships
    ships.map((ship) => {
      if (ship.isSunk()) {
        ship.coords.map((shipCoord) => {
          let sunkCoord = boardCoordinates.findIndex(
            (boardCoord) =>
              boardCoord.pos.x === shipCoord.pos.x &&
              boardCoord.pos.y === shipCoord.pos.y
          );
          boardCoordinates[sunkCoord].status = "sunk";
        });
      }
    });
  };

  const reportShips = () => {
    //this method should return true if all ships are sunk
    let sunkShips = 0;
    ships.map((ship) => {
      if (ship.isSunk() === true) sunkShips++;
      return ship;
    });

    return sunkShips === ships.length;
  };

  const resetBoard = () => {
    //clears the board coordinates array and ships

    //delete board
    let boardLength = boardCoordinates.length;
    for (let i = 0; i < boardLength; i++) {
      boardCoordinates.pop();
    }

    //reset ships
    let shipsLength = ships.length;
    for (let i = 0; i < shipsLength; i++) {
      ships.pop();
    }

    //set board to default
    setBoardCoordinates();
    console.log(boardCoordinates.length);
  };

  return {
    ships,
    boardCoordinates,
    setBoardCoordinates,
    placeShip,
    receiveAttack,
    reportShips,
    updateToSunk,
    resetBoard,
    randomizeShip,
  };
};

export default gameboardFactory;
