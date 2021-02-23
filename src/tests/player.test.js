import playerFactory from "../data/player";
import gameboardFactory from "../data/gameboard";

const p1Board = gameboardFactory();
const cpuBoard = gameboardFactory();

let player;
let cpu;

test("creating players works", () => {
  player = playerFactory(p1Board);
  player.board.setBoardCoordinates();
  cpu = playerFactory(cpuBoard);
  cpu.board.setBoardCoordinates();

  expect(player.board).toBeDefined();
  expect(cpu.board).toBeDefined();
});

test("player placing ships work", () => {
  player.board.placeShip("Patrol", 2, [
    { pos: { x: 1, y: 1 }, isHit: false },
    { pos: { x: 2, y: 1 }, isHit: false },
  ]);

  cpu.board.placeShip("Submarine", 3, [
    { pos: { x: 1, y: 3 }, isHit: false },
    { pos: { x: 1, y: 4 }, isHit: false },
    { pos: { x: 1, y: 5 }, isHit: false },
  ]);

  expect(player.board.boardCoordinates[0].ship).toBe("Patrol");
  expect(player.board.boardCoordinates[10].ship).toBe("Patrol");
  expect(cpu.board.boardCoordinates[2].ship).toBe("Submarine");
  expect(cpu.board.boardCoordinates[3].ship).toBe("Submarine");
  expect(cpu.board.boardCoordinates[4].ship).toBe("Submarine");
});

test("playerAttack() updates opponent board status", () => {
  player.playerAttack(1, 3, cpu);
  player.playerAttack(1, 6, cpu);
  expect(cpu.board.boardCoordinates[2].isAttacked).toBe(true);
  expect(cpu.board.boardCoordinates[2].status).toBe("hit");
  expect(cpu.board.boardCoordinates[5].status).toBe("miss");

});

test("aiAttack() updates player board status", () => {
  let recordAttack = cpu.aiAttack(player);
  let attackedCoord = player.board.boardCoordinates.findIndex(
    (coord) => coord.pos.x === recordAttack.x && coord.pos.y === recordAttack.y
  );
  expect(player.board.boardCoordinates[attackedCoord].isAttacked).toBe(true);
});
