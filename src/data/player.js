const playerFactory = (board) => {
  let attacksRecord = []; //ex. [{x: 1, y: 1},{x: 1, y: 2}]

  const randomAttack = () => {
    //return a random coordinate that is not attacked yet
    //picks a coordinate to attack from a 10x10 board
    let randomCoords = {
      x: Math.floor(Math.random() * 10) + 1,
      y: Math.floor(Math.random() * 10) + 1,
    };
    //if coordinates already exist on attacksRecord, pick new random coord
    return checkAttacksRecord(randomCoords.x, randomCoords.y) > -1
      ? randomAttack()
      : randomCoords;
  };

  const playerAttack = (targetX, targetY, cpu) => {
    let attackResult = cpu.board.receiveAttack(targetX, targetY);
    return {
      coords: { x: targetX, y: targetY },
      result: attackResult,
    };
  };

  const aiAttack = (player) => {
    //attacks the opponent's board and records the attack coordinate
    let randomCoords = randomAttack();
    let attackResult = player.board.receiveAttack(
      randomCoords.x,
      randomCoords.y
    );
    attacksRecord.push(randomCoords);
    return {
      coords: { ...randomCoords },
      result: attackResult,
    };
  };

  //variables to be used by ai attacks
  let prevAttackStatus = "miss"; //record previous attack if miss/hit/sunk
  let prevAttackCoords;
  let prevAttackIndex;
  let firstHitIndex;
  let firstHitCoord;
  let targetAcquired = false;
  let targetShip = "";
  let targetAxis = null;
  let checkRight = true;
  let checkUp = true;

  const aiAttackImproved = (player) => {
    //attacks the opponent's board and records the attack coordinate
    let attackResult; //records result of attack if miss/hit/sunk

    const attackAdjacent = () => {
      //randomly choose to attack left,right,up or down adjacent panels
      let randomCoords;
      let adjacentAxis;
      let randChoices = ["left", "right", "up", "down"];
      let randPick = randChoices[Math.floor(Math.random() * 4)];
      switch (randPick) {
        case "left":
          adjacentAxis = "horizontal";
          randomCoords = { x: firstHitCoord.x - 1, y: firstHitCoord.y };
          break;
        case "right":
          adjacentAxis = "horizontal";
          randomCoords = { x: firstHitCoord.x + 1, y: firstHitCoord.y };
          break;
        case "up":
          adjacentAxis = "vertical";
          randomCoords = { x: firstHitCoord.x, y: firstHitCoord.y - 1 };
          break;
        case "down":
          adjacentAxis = "vertical";
          randomCoords = { x: firstHitCoord.x, y: firstHitCoord.y + 1 };
          break;
        default:
          break;
      }

      //check if coordinate exists
      let adjacentIndex = player.board.findBoardIndex(
        randomCoords.x,
        randomCoords.y
      );
      if (adjacentIndex > -1) {
        //check if coordinates already exist on attacksRecord
        return checkAttacksRecord(randomCoords.x, randomCoords.y) > -1
          ? attackAdjacent()
          : {
              axis: adjacentAxis,
              direction: randPick,
              index: adjacentIndex,
              pos: randomCoords,
            };
      } else {
        return attackAdjacent();
      }
    };

    const attackHorizontal = () => {
      //returns a legitimate attack coords to the right/left direction
      let attackX;
      if (checkRight) attackX = prevAttackCoords.x + 1;
      else if (!checkRight) attackX = prevAttackCoords.x - 1;

      //check if attack is legitimate
      if (
        attackX < 11 &&
        attackX > 0 &&
        checkAttacksRecord(attackX, prevAttackCoords.y) === -1
      ) {
        let returnCoord = {
          x: attackX,
          y: prevAttackCoords.y,
        };
        return returnCoord;
      } else {
        checkRight = !checkRight;
        prevAttackCoords.x = firstHitCoord.x;
        attackHorizontal();
      }
    };

    const attackVertical = () => {
      //returns a legitimate attack coords to the up/down direction
      let attackY;
      if (checkUp) attackY = prevAttackCoords.y - 1;
      else if (!checkUp) attackY = prevAttackCoords.y + 1;

      //check if attack is legitimate
      if (
        attackY < 11 &&
        attackY > 0 &&
        checkAttacksRecord(prevAttackCoords.x, attackY) === -1
      ) {
        let returnCoord = {
          x: prevAttackCoords.x,
          y: attackY,
        };
        return returnCoord;
      } else {
        checkUp = !checkUp;
        prevAttackCoords.y = firstHitCoord.y;
        attackVertical();
      }
    };

    if (!targetAcquired) {
      //if there are no current targeted ship attack randomly and record data if attack hits
      let randomCoords = randomAttack();
      attackResult = player.board.receiveAttack(randomCoords.x, randomCoords.y);
      attacksRecord.push(randomCoords);
      prevAttackStatus = attackResult;
      prevAttackCoords = randomCoords;
      prevAttackIndex = player.board.findBoardIndex(
        randomCoords.x,
        randomCoords.y
      );

      //check if random attack hits a target and record data()
      if (attackResult === "sunk") {
        targetAcquired = false;
        targetShip = "";
        targetAxis = null;
      }
      if (attackResult === "hit") {
        //acquire target
        targetAcquired = true;
        //set target ship type
        targetShip = player.board.boardCoordinates[prevAttackIndex].ship;
        //record coord and index of first hit
        firstHitCoord = randomCoords;
        firstHitIndex = prevAttackIndex;
      }
    } else if (targetAcquired) {
      //get random axis if there is no target ship axis yet
      let attackAdjacentCoord; //ex. { axis: "horizontal", direction: "left", index: 0, pos: {x: 1, y: 1} }
      if (!targetAxis) {
        attackAdjacentCoord = attackAdjacent();
        attackResult = player.board.receiveAttack(
          attackAdjacentCoord.pos.x,
          attackAdjacentCoord.pos.y
        );

        prevAttackCoords = attackAdjacentCoord.pos;
        prevAttackIndex = attackAdjacentCoord.index;
        prevAttackStatus = attackResult;
        attacksRecord.push(attackAdjacentCoord.pos);

        if (
          attackResult === "sunk" &&
          player.board.boardCoordinates[attackAdjacentCoord.index].ship ===
            targetShip
        ) {
          targetAcquired = false;
          targetShip = "";
          targetAxis = null;
        } else if (
          attackResult === "hit" &&
          player.board.boardCoordinates[attackAdjacentCoord.index].ship ===
            targetShip
        ) {
          targetAxis = attackAdjacentCoord.axis;
          switch (attackAdjacentCoord.direction) {
            case "left":
              checkRight = false;
              break;
            case "right":
              checkRight = true;
              break;
            case "up":
              checkUp = true;
              break;
            case "down":
              checkUp = false;
              break;
            default:
              break;
          }
        }
      } else {
        let attackCoords;
        if (targetAxis === "horizontal") {
          do {
            attackCoords = attackHorizontal();
          } while (typeof attackCoords === "undefined");
        } else if (targetAxis === "vertical") {
          do {
            attackCoords = attackVertical();
          } while (typeof attackCoords === "undefined");
        }
        attackResult = player.board.receiveAttack(
          attackCoords.x,
          attackCoords.y
        );
        //record result
        prevAttackStatus = attackResult;
        prevAttackCoords = attackCoords;
        prevAttackIndex = player.board.findBoardIndex(
          attackCoords.x,
          attackCoords.y
        );
        attacksRecord.push(attackCoords);

        if (attackResult === "sunk") {
          targetAcquired = false;
          targetShip = "";
          targetAxis = null;
        } else if (
          (attackResult === "hit" &&
            player.board.boardCoordinates[prevAttackIndex].ship !==
              targetShip) ||
          attackResult === "miss"
        ) {
          switch (targetAxis) {
            case "horizontal":
              checkRight = !checkRight;
              prevAttackCoords.x = firstHitCoord.x;
              break;
            case "vertical":
              checkUp = !checkUp;
              prevAttackCoords.y = firstHitCoord.y;
              break;
            default:
          }
        }
      }
    }

    return {
      coords: { ...prevAttackCoords },
      result: attackResult,
    };
  };

  const resetAttacksRecord = () => {
    let attacksRecordLength = attacksRecord.length;
    for (let i = 0; i < attacksRecordLength; i++) {
      attacksRecord.pop();
    }
  };

  const checkAttacksRecord = (x, y) => {
    //shortcut for finding if a coord is already in the attacksRecord
    return attacksRecord.findIndex((coord) => coord.x === x && coord.y === y);
  };

  return {
    board,
    randomAttack,
    playerAttack,
    aiAttack,
    resetAttacksRecord,
    aiAttackImproved,
  };
};
export default playerFactory;
