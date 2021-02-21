import shipFactory from "./ship";

const gameboardFactory = () => {
  
  let boardCoordinates = [];
  let ships = [];
 

  const setBoardCoordinates = () => {
    //this method sets the gameboard coordinates and adds the ship coordinates to gameboard
    for(let i=1;i<=10;i++){
      for(let j=1;j<=10;j++){
        boardCoordinates.push({ pos: { x: i, y: j }, ship: 'none', isAttacked: false });
      }
    }
  };
  
  const setShipCoordinates = () => {
    //iterates ships objects, checks their position and marks them on the gameboard
    for (const [key, value] of Object.entries(ships)) {
      value.coords.map(coord => {
          let x = coord.pos.x;
          let y = coord.pos.y;
         let tempCoord =  boardCoordinates.findIndex(coord => (coord.pos.x === x && coord.pos.y === y));
         boardCoordinates[tempCoord].ship = value.type;
         return coord;
      });
    }
  };

  
  const placeShip = (type, length, coords) => {
    //places a ship into its coordinates on the board
    const newShip = shipFactory(type, length, coords);
    ships.push(newShip);
    newShip.coords.map(coord => {
      let x = coord.pos.x;
      let y = coord.pos.y;
     let tempCoord =  boardCoordinates.findIndex(coord => (coord.pos.x === x && coord.pos.y === y));
     boardCoordinates[tempCoord].ship = newShip.type;
     return coord;
  });
    return "ship placed";
  };

  const receiveAttack = (targetX, targetY) => {
    //takes a coordinate and determines whether or not the attack hit a ship. also records misses
    boardCoordinates.forEach(coord => {
      if (coord.pos.x === targetX && coord.pos.y === targetY) {
        coord.isAttacked = true;
        if(coord.ship === 'none') {
          coord.status = 'miss';
        } else {
          coord.status = 'hit';
          ships.forEach(ship => {
            if(ship.type === coord.ship){
              ship.hit(targetX,targetY);
            }
          });
        }
      }
    });
  };

  const reportShips = () => {
    //this method should return true if all ships are sunk
    let sunkShips = 0;
    ships.map(ship => {
      if(ship.isSunk() === true) sunkShips++;
      return ship;
    });

    return sunkShips === ships.length;
  }

  return {
    ships,
    boardCoordinates,
    setBoardCoordinates,
    setShipCoordinates,
    placeShip,
    receiveAttack,
    reportShips
  };
};

export default gameboardFactory;
