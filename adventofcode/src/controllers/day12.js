const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day12 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day12test.txt'))[0]);

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 12, part1: part1, part2:  part2};
})

module.exports = { day12 }