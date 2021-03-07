import playerFactory from "./data/player";
import gameboardFactory from "./data/gameboard";

const game_controller = (function () {
  let turn = "player"; //"player" or "cpu"
  let Player = playerFactory(gameboardFactory());
  let CPU = playerFactory(gameboardFactory());

  function start() {
    //initialize board of player/cpu
    Player.board.setBoardCoordinates();
    CPU.board.setBoardCoordinates();
  }

  function resetGame() {
    //resets board of player and cpu
    Player.board.resetBoard();
    CPU.board.resetBoard();
    CPU.resetAttacksRecord();
    turn="player";
  }

  function randomizeShips () {
    //randomizes all 5 ships of CPU
    CPU.board.randomizeShip();
  }

  return {
    Player,
    CPU,
    turn,
    start,
    resetGame,
    randomizeShips,
  };
})();

export default game_controller;
