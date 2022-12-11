const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day10 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day10.txt')));

    const program = execute(arr);
    var signal_strength = calculateSignalStrenth(program);
    for(i=0; i<program.length; i++) {
        console.log(`i ${i} - X: ${program[i]}`);
    }

    const part1 = signal_strength;
    const part2 = 0;
    return { dayNumber: 10, part1: part1, part2:  part2};
})

function execute(arr) {
    var X = 1;
    var program = [];
    program.push(X);
    arr.forEach(row => {
        c = row.split(' ');
        command = c[0];
        if(command === 'addx') {
            val = parseInt(c[1]);
            program.push(X);
            program.push(X)
            X+=val;
            //program.push(X);
        } else if(command === 'noop') {
            program.push(X);
        }
    });
    return program;
}

function calculateSignalStrenth(program) {
    var i = 20;
    var signal_strength = 0;
    while(i<= 220) {
        console.log(`i:${i} - ${signal_strength} + ${(program[i] * i)}`);
        signal_strength += (program[i] * i);
        i+=40;
    }
    return signal_strength;
}

module.exports = { day10 }