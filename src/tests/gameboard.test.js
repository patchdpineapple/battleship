import gameboardFactory from "../data/gameboard";
/*
const Patrol = shipFactory("Patrol", 2, [
  { pos: { x: 1, y: 1 }, isHit: false },
  { pos: { x: 2, y: 1 }, isHit: false },
]);

const Submarine = shipFactory("Submarine", 3, [
  { pos: { x: 1, y: 3 }, isHit: false },
  { pos: { x: 1, y: 4 }, isHit: false },
  { pos: { x: 1, y: 5 }, isHit: false },
]);

const Destroyer = shipFactory("Destroyer", 3, [
  { pos: { x: 6, y: 10 }, isHit: false },
  { pos: { x: 7, y: 10 }, isHit: false },
  { pos: { x: 8, y: 10 }, isHit: false },
]);

const BattleShip = shipFactory("BattleShip", 4, [
  { pos: { x: 5, y: 5 }, isHit: false },
  { pos: { x: 5, y: 6 }, isHit: false },
  { pos: { x: 5, y: 7 }, isHit: false },
  { pos: { x: 5, y: 8 }, isHit: false },
]);

const Carrier = shipFactory("Carrier", 5, [
  { pos: { x: 1, y: 9 }, isHit: false },
  { pos: { x: 2, y: 9 }, isHit: false },
  { pos: { x: 3, y: 9 }, isHit: false },
  { pos: { x: 4, y: 9 }, isHit: false },
  { pos: { x: 5, y: 9 }, isHit: false },
]);
*/

// const myShips = {
//   Patrol: Patrol,
//   Submarine: Submarine,
//   Destroyer: Destroyer,
//   BattleShip: BattleShip,
//   Carrier: Carrier,
//  };

//  const arrShips = [
//   Patrol,
//   Submarine,
//   Destroyer,
//   BattleShip,
//   Carrier,
//  ];

// test("initialize ships should work", () => {
//   P1board = gameboardFactory(arrShips);
//   expect(P1board.ships).toBeDefined();
// });

let P1board;
P1board = gameboardFactory();

test("coordinates should be set, and ships are marked on the coordinates", () => {
  P1board.setBoardCoordinates();
  expect(P1board.boardCoordinates.length).toBe(100);
});

test("placeShip() should create a new ship and add into the board", () => {
  P1board.placeShip("Patrol", 2, [
    { pos: { x: 1, y: 1 }, isHit: false },
    { pos: { x: 2, y: 1 }, isHit: false },
  ]);
  expect(P1board.ships.length).toBe(1);
  expect(P1board.ships[0]).toBeDefined();
  expect(P1board.boardCoordinates[0]).toEqual({
    pos: { x: 1, y: 1 },
    ship: "Patrol",
    isAttacked: false,
  });

  P1board.placeShip("Submarine", 3, [
    { pos: { x: 1, y: 3 }, isHit: false },
    { pos: { x: 1, y: 4 }, isHit: false },
    { pos: { x: 1, y: 5 }, isHit: false },
  ]);
  expect(P1board.ships.length).toBe(2);
});

test("receiveAttack() should update gameboard coordinate isAttacked status to true", () => {
  P1board.receiveAttack(1, 1);
  expect(P1board.boardCoordinates[0].isAttacked).toBe(true);
  expect(P1board.boardCoordinates[0].status).toBe("hit");
  P1board.receiveAttack(2, 1);
  expect(P1board.boardCoordinates[10].isAttacked).toBe(true);
  expect(P1board.boardCoordinates[10].status).toBe("hit");
  P1board.receiveAttack(3, 1);
  expect(P1board.boardCoordinates[20].isAttacked).toBe(true);
  expect(P1board.boardCoordinates[20].status).toBe("miss");
});

test("reportShips() should return true when no more ships are alive", () => {
  P1board.receiveAttack(1, 3);
  P1board.receiveAttack(1, 4);
  P1board.receiveAttack(1, 5);
  expect(P1board.reportShips()).toBe(true);
});
