const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day6 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day6.txt'))[0]);

    const part1 = findMarker(arr, 4);
    const part2 = findMarker(arr, 14);
    return { dayNumber: 6, part1: part1, part2:  part2};
})

function findMarker(arr, characters) {
    acc = arr.slice(0, characters);
    for(let i = 0; i < arr.length; i++) {
        acc.shift();
        acc.push(arr[i]);
        s = new Set(acc);
        if(s.size >= characters) {
            return i+1;
        }
    }
}

module.exports = { day6 }