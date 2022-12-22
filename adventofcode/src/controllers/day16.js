const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day16 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day16.txt')));

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 16, part1: part1, part2:  part2};
})

module.exports = { day16 }