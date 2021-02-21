const playerFactory = (board) => {
    
    let attacksRecord = [];

    const randomAttack = () => {
        //picks a coordinate to attack from a 10x10 board
        let randomCoords = {
            x: Math.floor(Math.random * 10), 
            y: Math.floor(Math.random * 10) 
        };
        
        //if coords already exist on attacksRecord, make new coord
        return attacksRecord.findIndex(coord => (coord.x === randomCoords.x && coord.y === randomCoords.y)) ?
        randomAttack() : randomCoords;
    }

    const playerAttack= (targetX, targetY) => {
        return {x: targetX, y: targetY};
    };

    const aiAttack= (playerBoard) => {
       let randomCoords = randomAttack();
       playerBoard.receiveAttack(randomCoords.x, randomCoords.y);
    };
   
    return {
        board,
        randomAttack,
        playerAttack,
        aiAttack,
    };
  };
export default playerFactory;