const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day21 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day21.txt')));

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 21, part1: part1, part2:  part2};
})

module.exports = { day21 }