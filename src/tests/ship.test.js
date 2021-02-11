import shipFactory from '../data/ship';


test('ship should be hit if equal coords to target', ()=>{
  const Patrol = shipFactory("Patrol", 2, [
    { coord: { x: 0, y: 0 }, hit: false },
    { coord: { x: 0, y: 1 }, hit: false },
  ]);
  let isShipHit = false;
  Patrol.isHit(0,1);  
  Patrol.coords.map(i => i.hit === true ? isShipHit = true : isShipHit = false );
    expect(isShipHit).toBe(true); 
});

test('ship should be sunk after all coordinates are hit', ()=>{
  const Patrol = shipFactory("Patrol", 2, [
    { coord: { x: 0, y: 0 }, hit: false },
    { coord: { x: 0, y: 1 }, hit: false },
  ]);
  Patrol.isHit(0,0);  
  Patrol.isHit(0,1);  
  expect(Patrol.isSunk()).toBe(true); 
});

test('ship should not be sunk if not all coordinates are hit', ()=>{
  const Patrol = shipFactory("Patrol", 2, [
    { coord: { x: 0, y: 0 }, hit: false },
    { coord: { x: 0, y: 1 }, hit: false },
  ]);
  Patrol.isHit(0,0);  
  expect(Patrol.isSunk()).toBe(false); 
});


