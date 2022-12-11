const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day11 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day11.txt'))[0]);

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 11, part1: part1, part2:  part2};
})



module.exports = { day11 }