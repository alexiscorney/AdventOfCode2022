const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day6 = ((req, res) => {
    const arr = fileToArray(getInputPath('day6.txt'));
    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 6, part1: part1, part2:  part2};
})

module.exports = { day6 }