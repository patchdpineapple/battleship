import playerFactory from "./data/player";
import gameboardFactory from "./data/gameboard";

const game_controller = (function () {
  let turn = "player"; //"player" or "cpu"
  let Player = playerFactory(gameboardFactory());
  let CPU = playerFactory(gameboardFactory());

  function start() {
    // setShips();
    Player.board.setBoardCoordinates();
    CPU.board.setBoardCoordinates();
    Player.board.randomizeShip();
    CPU.board.randomizeShip();

console.log("Player:", Player.board.ships);
  
console.log("Player:", Player.board.ships.length);
console.log(Player.board.ships[0].type, Player.board.ships[0].coords);
console.log(Player.board.ships[1].type, Player.board.ships[1].coords);
console.log(Player.board.ships[2].type, Player.board.ships[2].coords);
console.log(Player.board.ships[3].type, Player.board.ships[3].coords);
console.log(Player.board.ships[4].type, Player.board.ships[4].coords);

console.log("CPU:",CPU.board.ships.length);
console.log(CPU.board.ships[0].type, CPU.board.ships[0].coords);
console.log(CPU.board.ships[1].type, CPU.board.ships[1].coords);
console.log(CPU.board.ships[2].type, CPU.board.ships[2].coords);
console.log(CPU.board.ships[3].type, CPU.board.ships[3].coords);
console.log(CPU.board.ships[4].type, CPU.board.ships[4].coords);


  }

  function resetGame() {
    Player.board.resetBoard();
    CPU.board.resetBoard();
    turn="player";
  }

  function setShips() {
    //create player ships
    Player.board.setBoardCoordinates();
    Player.board.placeShip("Patrol", 2, [
      { pos: { x: 1, y: 1 }, isHit: false },
      { pos: { x: 2, y: 1 }, isHit: false },
    ]);

    Player.board.placeShip("Submarine", 3, [
      { pos: { x: 1, y: 6 }, isHit: false },
      { pos: { x: 1, y: 7 }, isHit: false },
      { pos: { x: 1, y: 8 }, isHit: false },
    ]);

    Player.board.placeShip("Destroyer", 3, [
      { pos: { x: 6, y: 10 }, isHit: false },
      { pos: { x: 7, y: 10 }, isHit: false },
      { pos: { x: 8, y: 10 }, isHit: false },
    ]);

    Player.board.placeShip("Battleship", 4, [
      { pos: { x: 4, y: 5 }, isHit: false },
      { pos: { x: 5, y: 5 }, isHit: false },
      { pos: { x: 6, y: 5 }, isHit: false },
      { pos: { x: 7, y: 5 }, isHit: false },
    ]);

    Player.board.placeShip("Carrier", 5, [
      { pos: { x: 10, y: 2 }, isHit: false },
      { pos: { x: 10, y: 3 }, isHit: false },
      { pos: { x: 10, y: 4 }, isHit: false },
      { pos: { x: 10, y: 5 }, isHit: false },
      { pos: { x: 10, y: 6 }, isHit: false },
    ]);

    //create cpu ships
    CPU.board.setBoardCoordinates();
    CPU.board.placeShip("Patrol", 2, [
      { pos: { x: 1, y: 1 }, isHit: false },
      { pos: { x: 2, y: 1 }, isHit: false },
    ]);

    CPU.board.placeShip("Submarine", 3, [
      { pos: { x: 1, y: 6 }, isHit: false },
      { pos: { x: 1, y: 7 }, isHit: false },
      { pos: { x: 1, y: 8 }, isHit: false },
    ]);

    CPU.board.placeShip("Destroyer", 3, [
      { pos: { x: 6, y: 10 }, isHit: false },
      { pos: { x: 7, y: 10 }, isHit: false },
      { pos: { x: 8, y: 10 }, isHit: false },
    ]);

    CPU.board.placeShip("Battleship", 4, [
      { pos: { x: 4, y: 5 }, isHit: false },
      { pos: { x: 5, y: 5 }, isHit: false },
      { pos: { x: 6, y: 5 }, isHit: false },
      { pos: { x: 7, y: 5 }, isHit: false },
    ]);

    CPU.board.placeShip("Carrier", 5, [
      { pos: { x: 10, y: 2 }, isHit: false },
      { pos: { x: 10, y: 3 }, isHit: false },
      { pos: { x: 10, y: 4 }, isHit: false },
      { pos: { x: 10, y: 5 }, isHit: false },
      { pos: { x: 10, y: 6 }, isHit: false },
    ]);
  }

  return {
    Player,
    CPU,
    turn,
    start,
    resetGame,
  };
})();

export default game_controller;
