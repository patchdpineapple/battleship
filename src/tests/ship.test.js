import shipFactory from "../data/ship";


test("ship should be hit if equal coords to target", () => {
  const Patrol = shipFactory("Patrol", 2, [
    { pos: { x: 1, y: 1 }, isHit: false },
    { pos: { x: 1, y: 2 }, isHit: false },
  ]);
  Patrol.hit(1, 1);

  expect(Patrol.coords[0].isHit).toBe(true);
});

test("ship should be sunk after all coordinates are hit", () => {
  const Patrol = shipFactory("Patrol", 2, [
    { pos: { x: 1, y: 1 }, hit: false },
    { pos: { x: 1, y: 2 }, hit: false },
  ]);
  Patrol.hit(1, 1);
  Patrol.hit(1, 2);
  expect(Patrol.isSunk()).toBe(true);
});

test("ship should not be sunk if not all coordinates are hit", () => {
  const Patrol = shipFactory("Patrol", 2, [
    { pos: { x: 1, y: 1 }, hit: false },
    { pos: { x: 1, y: 2 }, hit: false },
  ]);
  Patrol.hit(1, 1);
  expect(Patrol.isSunk()).toBe(false);
});
