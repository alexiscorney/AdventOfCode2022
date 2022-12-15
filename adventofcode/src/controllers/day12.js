const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { TreeNode } = require('../data_stuctures/TreeNode');
const { Coordinate } = require('../data_stuctures/Coordinate');
const { AStar } = require('../utils/pathFinder');

const day12 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day12test.txt')));
    const grid = arr.map(row => row.split(''));
    [start, end] = findStartAndEnd(grid);

    const pathFinder = new AStar(grid, start, end);
    var path = pathFinder.search();
    console.log(path);

    console.log(`start at ${start.toString()}. End at ${end.toString()}`);
    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 12, part1: part1, part2:  part2};
})

function findStartAndEnd(grid) {
    var start;
    var end;
    for(let i = 0; i < grid.length; i++) {
        for(let j= 0; j < grid[i].length; j++) {
            if(grid[i][j] === 'S') {
                start = new Coordinate(j,i);
            } 
            if(grid[i][j] === 'E') {
                end = new Coordinate(j,i);
            }
        }
    }
    return [start,end];

}
module.exports = { day12 }