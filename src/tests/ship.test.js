import shipFactory from "../data/ship";

const Patrol = shipFactory("Patrol", 2, [
  { pos: { x: 1, y: 1 }, isHit: false },
  { pos: { x: 1, y: 2 }, isHit: false },
]);

test("hit() should change ship coord isHit status to true if target coordinates are same as the ship", () => {
  Patrol.hit(1, 1);
  expect(Patrol.coords[0].isHit).toBe(true);
});

test("isSunk() should report true if all coords are hit, false otherwise", () => {
  expect(Patrol.isSunk()).toBe(false);
  Patrol.hit(1, 2);
  expect(Patrol.isSunk()).toBe(true);
});
