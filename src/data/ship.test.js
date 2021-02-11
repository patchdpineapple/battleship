import shipFactory from './ship';



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

test('ship should not be hit if not equal coords to target', ()=>{
  const Patrol = shipFactory("Patrol", 2, [
    { coord: { x: 0, y: 0 }, hit: false },
    { coord: { x: 0, y: 1 }, hit: false },
  ]);
  let isShipHit = false;
  Patrol.isHit(0,2);  
  Patrol.coords.map(i => i.hit === true ? isShipHit = true : isShipHit = false );

  expect(isShipHit).toBe(false);
}); 