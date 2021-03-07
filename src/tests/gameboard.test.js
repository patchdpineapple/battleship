import gameboardFactory from "../data/gameboard";

let P1board;
P1board = gameboardFactory();

test("10x10 coordinates should be set", () => {
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
    status: null,
  });

  P1board.placeShip("Submarine", 3, [
    { pos: { x: 1, y: 6 }, isHit: false },
    { pos: { x: 1, y: 7 }, isHit: false },
    { pos: { x: 1, y: 8 }, isHit: false },
  ]);
  expect(P1board.ships.length).toBe(2);
});

test("receiveAttack() should update gameboard coordinate isAttacked status to true", () => {
  P1board.receiveAttack(1, 1);
  expect(P1board.boardCoordinates[0].isAttacked).toBe(true);
  expect(P1board.boardCoordinates[0].status).toBe("hit");

  P1board.receiveAttack(3, 1);
  expect(P1board.boardCoordinates[2].isAttacked).toBe(true);
  expect(P1board.boardCoordinates[2].status).toBe("miss");
});

test("updateToSunk() should change coords status to sunk if a ship with same coords is sunk", () => {
  P1board.receiveAttack(2, 1);
  expect(P1board.boardCoordinates[0].status).toBe("sunk");
  expect(P1board.boardCoordinates[1].status).toBe("sunk");

  P1board.receiveAttack(1, 6);
  P1board.receiveAttack(1, 7);
  P1board.receiveAttack(1, 8);
  expect(P1board.boardCoordinates[50].status).toBe("sunk");
  expect(P1board.boardCoordinates[60].status).toBe("sunk");
  expect(P1board.boardCoordinates[70].status).toBe("sunk");
});

test("reportShips() should return true when no more ships are alive", () => {
  P1board.receiveAttack(1, 3);
  P1board.receiveAttack(1, 4);
  P1board.receiveAttack(1, 5);
  expect(P1board.reportShips()).toBe(true);
});

test("resetBoard() should reset board array and ships", () => {
  P1board.resetBoard();
  let nullChecker = 0;
  P1board.boardCoordinates.map((coord) => {
    if (!coord.ship) nullChecker++;
  });
  expect(nullChecker).toBe(100);
  expect(P1board.ships.length).toBe(0);
});

test("randomizeShip() should place 5 ships randomly on the board", () => {
  P1board.randomizeShip();
  expect(P1board.ships.length).toBe(5);
  expect(P1board.ships[4].coords.length).toBe(2);
  expect(P1board.ships[3].coords.length).toBe(3);
  expect(P1board.ships[2].coords.length).toBe(3);
  expect(P1board.ships[1].coords.length).toBe(4);
  expect(P1board.ships[0].coords.length).toBe(5);
});
