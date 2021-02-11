const shipFactory = (type, length, coords) => {
  //this method finds the coordinates equal to the target and changes its hit status to true
  const isHit = (targetX, targetY) => {
    let temp = coords.map((i) => {
      if (i.coord.x === targetX && i.coord.y === targetY) {
        i.hit = true;
      }
      return i;
    });
  };

  //this method checks all coordinates and returns true if all coordinates were hit
  const isSunk = () => {
    let hitChecker = 0;
    for(let i=0;i<coords.length;i++){
      if(coords[i].hit === true) ++hitChecker;
    }
    if(hitChecker === length) return true;
    else return false;
  };

  return {
    type,
    length,
    coords,
    isHit,
    isSunk,
  };
};

export default shipFactory;
