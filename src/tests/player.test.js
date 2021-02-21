import playerFactory from "../data/player";
import gameboardFactory from "../data/gameboard";

const p1Board = gameboardFactory();
const cpuBoard = gameboardFactory();

let player;
let cpu;

test("creating players works", () => {
    player = playerFactory(p1Board);
    cpu = playerFactory(cpuBoard);

    expect(player.board).toBeDefined();
    expect(cpu.board).toBeDefined();

});

test("playerAttack() works",()=>{
    expect(player.playerAttack(1,2)).toStrictEqual({x:1, y:2});
    expect(player.playerAttack(5,5)).toStrictEqual({x:5, y:5});
    expect(player.playerAttack(10,7)).toStrictEqual({x:10, y:7});
});
