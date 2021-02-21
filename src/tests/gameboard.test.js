import gameboardFactory from "../data/gameboard";
import shipFactory from "../data/ship";
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
  // P1board.setShipCoordinates(); 
  expect(P1board.boardCoordinates.length).toBe(100);
  // expect(P1board.boardCoordinates[5]).toEqual({ pos: { x: 1, y: 6 }, ship: 'none', isAttacked: false });
  // expect(P1board.boardCoordinates[0]).toEqual({ pos: { x: 1, y: 1 }, ship: 'Patrol', isAttacked: false });
  // expect(P1board.boardCoordinates[4]).toEqual({ pos: { x: 1, y: 5 }, ship: 'Submarine', isAttacked: false });
  // expect(P1board.boardCoordinates[59]).toEqual({ pos: { x: 6, y: 10 }, ship: 'Destroyer', isAttacked: false });
  // expect(P1board.boardCoordinates[47]).toEqual({ pos: { x: 5, y: 8 }, ship: 'BattleShip', isAttacked: false });
  // expect(P1board.boardCoordinates[48]).toEqual({ pos: { x: 5, y: 9 }, ship: 'Carrier', isAttacked: false });
});

test("placeShip() should create a new ship and add into the board", () => {
  P1board.placeShip("Patrol", 2, [
    { pos: { x: 1, y: 1 }, isHit: false },
    { pos: { x: 2, y: 1 }, isHit: false },
  ]);

  expect(P1board.ships.length).toBe(1);
  expect(P1board.ships[0]).toBeDefined();
  expect(P1board.boardCoordinates[0]).toEqual({ pos: { x: 1, y: 1 }, ship: 'Patrol', isAttacked: false });
});

test("receiveAttack() should update gameboard coordinate isAttacked status to true", () => {
 
  P1board.receiveAttack(1, 1);
  expect(P1board.boardCoordinates[0].isAttacked).toBe(true);
  expect(P1board.boardCoordinates[0].status).toBe('hit');
  P1board.receiveAttack(2, 1);
  expect(P1board.boardCoordinates[10].isAttacked).toBe(true);
  expect(P1board.boardCoordinates[10].status).toBe('hit');
  P1board.receiveAttack(3, 1);
  expect(P1board.boardCoordinates[20].isAttacked).toBe(true);
  expect(P1board.boardCoordinates[20].status).toBe('miss');

});

test("reportShips() should return true when no more ships are alive", () => {
  

  // P1board.receiveAttack(1, 1);
  // P1board.receiveAttack(2, 1);
  // P1board.receiveAttack(1, 3);
  // P1board.receiveAttack(1, 4);
  // P1board.receiveAttack(1, 5);
  // P1board.receiveAttack(6, 10);
  // P1board.receiveAttack(7, 10);
  // P1board.receiveAttack(8, 10);
  // P1board.receiveAttack(5, 5);
  // P1board.receiveAttack(5, 6);
  // P1board.receiveAttack(5, 7);
  // P1board.receiveAttack(5, 8);
  // P1board.receiveAttack(1, 9);
  // P1board.receiveAttack(2, 9);
  // P1board.receiveAttack(3, 9);
  // P1board.receiveAttack(4, 9);
  // P1board.receiveAttack(5, 9);
  expect(P1board.reportShips()).toBe(true);

});









