const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day4 = ((req, res) => {
    const arr = fileToArray(getInputPath('day4.txt'));
    
    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 4, part1: part1, part2:  part2};
})

module.exports = { day4 }