const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day9 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day9.txt'))[0]);

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 9, part1: part1, part2:  part2};
})

module.exports = { day9 }