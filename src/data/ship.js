const shipFactory = (type, length, coords) => {


  //this method finds the coordinates equal to the target and changes its hit status to true
  const isHit = (targetX, targetY) => {
    let temp= coords.map(i => {
        if(i.coord.x === targetX && i.coord.y === targetY){
            i.hit = true;
        }
        return i;
    });
    
  };
  
  //this method
  const isSunk = () => {
    return "ship sunk";
  };

  return {
    type,
    length,
    coords,
    isHit,
    isSunk,
  };
};

/* 
ex.
{
     type: Destroyer,
        length: 3,
        coords: [
            {

            },
        ]
       
}
*/

export default shipFactory;
