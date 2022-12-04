const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day4 = ((req, res) => {
    const arr = fileToArray(getInputPath('day4.txt'));
    var pairs = []; 
    arr.forEach((x,i) => {
        pair = x.split(','); 
        ranges = []
        pair.forEach((y,i) => {
            //console.log(y);
            indexes = y.split('-');
            ranges.push([...Array(parseInt(indexes[1]) - parseInt(indexes[0]) + 1).keys()].map(i => i + parseInt(indexes[0])));
        })
        ranges.sort(function(a,b) { return b.length - a.length });
        pairs.push(ranges);
    })
    var overlapping_pairs = pairs.filter(pair => (pair[1].every(val => pair[0].includes(val))));
    const part1 = overlapping_pairs.length;
    const part2 = 0;
    return { dayNumber: 4, part1: part1, part2:  part2};
})

module.exports = { day4 }