const shipFactory = (type, length, coords) => {
  const hit = (targetX, targetY) => {
  //this method finds the coordinates equal to the target and changes its hit status to true
    let temp = coords.map((coord) => {
      if (coord.pos.x === targetX && coord.pos.y === targetY) {
        coord.isHit = true;
      }
      return coord;
    });
  };

  const isSunk = () => {
  //this method checks all coordinates and returns true if all coordinates were hit
    let hitChecker = 0;
    for (let coord = 0; coord < coords.length; coord++) {
      if (coords[coord].isHit === true) ++hitChecker;
    }
    if (hitChecker === length) return true;
    else return false;
  };

  return {
    type,
    length,
    coords,
    hit,
    isSunk,
  };
};

/* sample ship
  const Patrol = shipFactory("Patrol", 2, [
  { pos: { x: 1, y: 1 }, isHit: false },
  { pos: { x: 1, y: 2 }, isHit: false },
]);

{ type: 'Patrol', 
  length: 2, 
  coords:  
   [ { pos: { x: 1, y: 1 },, isHit: false }, 
     { pos: { x: 1, y: 2 }, isHit: false } ], 
  hit: [λ: hit], 
  isSunk: [λ: isSunk] } 
}
*/

export default shipFactory;
