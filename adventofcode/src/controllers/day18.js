const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { parse } = require('path/posix');

const day18 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day18.txt')));
    const cubes = arr.map(row => row.split(',').map(a => parseInt(a)));
    let total_cubes = cubes.length;
    console.log(cubes);
    let pairs = generatePairs(cubes);
    let adjacent_pairs = pairs.filter(p => isAdjacent(p[0],p[1]));
    console.log(adjacent_pairs);
    
    let adjacent_cubes = adjacent_pairs.length;
    let exposed_sides = ((total_cubes * 6) - (adjacent_cubes * 2));


    const part1 = exposed_sides;
    const part2 = 0;
    return { dayNumber: 18, part1: part1, part2:  part2};
})

function isAdjacent(a,b) {
    let [x,y,z] = a;
    let [i,j,k] = b;
    let sum = Math.abs(x-i) + Math.abs(y-j) + Math.abs(z-k) 
    return sum === 1;
}

function generatePairs(cubes) {
    let pairs = [];
    while(cubes.length > 0) {
        let a = cubes.shift();
        for(let i=0; i<cubes.length;i++) {
            pairs.push([a, cubes[i]]);
        }
    }
    return pairs; 
}

module.exports = { day18 }