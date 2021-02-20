import gameboardFactory from "../data/gameboard";
import shipFactory from "../data/ship";

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

const myShips = {
  Patrol: Patrol,
  Submarine: Submarine,
  Destroyer: Destroyer,
  BattleShip: BattleShip,
  Carrier: Carrier,
 };


 const P1board = gameboardFactory(myShips); 

test("place ship should work", () => {
  expect(P1board.ships).toBeDefined();
});

test("coordinates should be set", () => {
  P1board.setBoardCoordinates();
  expect(P1board.boardCoordinates[5]).toEqual({ pos: { x: 1, y: 6 }, ship: 'none', isAttacked: false });
  expect(P1board.boardCoordinates[0]).toEqual({ pos: { x: 1, y: 1 }, ship: 'Patrol', isAttacked: false });
  expect(P1board.boardCoordinates[48]).toEqual({ pos: { x: 5, y: 9 }, ship: 'Carrier', isAttacked: false });


  
});







