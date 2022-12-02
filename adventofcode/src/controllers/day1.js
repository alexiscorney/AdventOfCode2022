

const { fileToArray } = require('../utils/readFile');

const day1 = ((req, res) => {
    const arr = fileToArray('/Users/adcorney/AdventOfCode2022/adventofcode/input /day1.txt');
    var s = 0;
    var cal_array = []
    arr.forEach((x,i) => {
        if(x) {
            s += parseInt(x);
        } else {
            cal_array.push(s);
            s = 0; 
        }
    });
    sorted_array = cal_array.sort(function(a,b) { return b - a; });
    var max = sorted_array[0];
    var top_3 = sorted_array[0] + sorted_array[1] + sorted_array[2];
    console.log(max);

    return { dayNumber: 1, part1: max, part2: top_3 };
})


module.exports = { day1 }