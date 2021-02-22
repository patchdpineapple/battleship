const playerFactory = (board) => {
    
    let attacksRecord = [];

    const randomAttack = () => {
        //picks a coordinate to attack from a 10x10 board
        let randomCoords = {
            x: (Math.floor(Math.random() * 10))+1, 
            y: (Math.floor(Math.random() * 10))+1
        };
        //if coordinates already exist on attacksRecord, make new coord
        return attacksRecord.findIndex(coord => (coord.x === randomCoords.x && coord.y === randomCoords.y)) > -1 ?
        randomAttack() : randomCoords;
    }

    const playerAttack= (targetX, targetY, cpu) => {
        cpu.board.receiveAttack(targetX, targetY);
        return {x: targetX, y: targetY};
    };

    const aiAttack= (player) => {
        //attacks the opponent's board and records the attack coordinate
       let randomCoords = randomAttack();
       player.board.receiveAttack(randomCoords.x, randomCoords.y);
       attacksRecord.push(randomCoords);
       return {...randomCoords};
    };
   
    return {
        board,
        randomAttack,
        playerAttack,
        aiAttack,
    };
  };
export default playerFactory;