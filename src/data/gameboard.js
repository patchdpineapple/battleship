import shipFactory from "./ship";

const gameboardFactory = (ships) => {
  
  let boardCoordinates = [];

  const setBoardCoordinates = () => {
    //this method sets the gameboard coordinates and adds the ship coordinates to gameboard
    for(let i=1;i<=10;i++){
      for(let j=1;j<=10;j++){
        boardCoordinates.push({ pos: { x: i, y: j }, ship: 'none', isAttacked: false });
      }
    }

    //iterates ships objects, checks their position and marks them on the gameboard
    for (const [key, value] of Object.entries(ships)) {
      console.log(`${key}: ${value}`);
      value.coords.map(coord => {
          let x = coord.pos.x;
          let y = coord.pos.y;
         let tempCoord =  boardCoordinates.findIndex(coord => (coord.pos.x === x && coord.pos.y === y));
         boardCoordinates[tempCoord].ship = value.type;
         return coord;
      });
    }
  };

  const placeShip = (ship) => {
    //places a ship into its coordinates on the board
    return "ship placed";
  };

  const receiveAttack = () => {
    //takes a coordinate and determines whether or not the attack hit a ship. also records misses
    return "ship placed";
  };

  return {
    ships,
    boardCoordinates,
    setBoardCoordinates,
    placeShip,
    receiveAttack,
    
  };
};

export default gameboardFactory;