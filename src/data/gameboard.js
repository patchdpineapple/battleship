import shipFactory from "./ship";

const gameboardFactory = (ships) => {
  
  let boardCoordinates = [];

  const setBoardCoordinates = () => {
    for(let i=1;i<=10;i++){
      for(let j=1;j<=10;j++){
        boardCoordinates.push({ pos: { x: i, y: j }, ship: 'none', isAttacked: false });
      }
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
