const playerFactory = (board) => {
  let attacksRecord = []; //ex. [{x: 1, y: 1},{x: 1, y: 2}]
  let previousAttackStatus = "miss"; //miss/hit/sunk

  const randomAttack = () => {
    //picks a coordinate to attack from a 10x10 board
    let randomCoords = {
      x: Math.floor(Math.random() * 10) + 1,
      y: Math.floor(Math.random() * 10) + 1,
    };
    //if coordinates already exist on attacksRecord, make new coord
    return attacksRecord.findIndex(
      (coord) => coord.x === randomCoords.x && coord.y === randomCoords.y
    ) > -1
      ? randomAttack()
      : randomCoords;
  };

  const playerAttack = (targetX, targetY, cpu) => {
    let recordResult = cpu.board.receiveAttack(targetX, targetY);
    return {
      coords: { x: targetX, y: targetY },
      result: recordResult,
    };
  };

  const aiAttack = (player) => {
    //attacks the opponent's board and records the attack coordinate
    let randomCoords = randomAttack();
    let recordResult = player.board.receiveAttack(
      randomCoords.x,
      randomCoords.y
    );
    attacksRecord.push(randomCoords);
    // return { ...randomCoords };
    return {
      coords: { ...randomCoords },
      result: recordResult,
    };
  };

  const aiAttackImproved = (player) => {
    //attacks the opponent's board and records the attack coordinate
    let randomCoords;
    let recordResult;
    if (previousAttackStatus === "miss") {
      randomCoords = randomAttack();
      recordResult = player.board.receiveAttack(randomCoords.x, randomCoords.y);
      attacksRecord.push(randomCoords);
      previousAttackStatus = recordResult;
    }

    // return { ...randomCoords };
    return {
      coords: { ...randomCoords },
      result: recordResult,
    };
  };

  const resetAttacksRecord = () => {
    let attacksRecordLength = attacksRecord.length;
    for (let i = 0; i < attacksRecordLength; i++) {
      attacksRecord.pop();
    }
  };

  return {
    board,
    randomAttack,
    playerAttack,
    aiAttack,
    resetAttacksRecord,
  };
};
export default playerFactory;
