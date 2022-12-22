const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day20 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day20.txt')));

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 20, part1: part1, part2:  part2};
})

module.exports = { day20 }