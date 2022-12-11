const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day10 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day10.txt')));

    const program = execute(arr);
    var signal_strength = calculateSignalStrenth(program);

    const part1 = signal_strength;

    lines = draw(program);
    console.log(lines);
    const part2 = 'BZPAJELK';
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
        signal_strength += (program[i] * i);
        i+=40;
    }
    return signal_strength;
}

function draw(program) {
    var i = 1; 
    var lines = [];
    current_line = '';
    while(i <= 240) {
        
        pos = i % 40;
        if(pos === 0) {
            pos = 40;
        }
        if(pos-1 === program[i]-1 || pos-1 === program[i] || pos-1 === program[i]+1) {
            current_line += '#';
        } else {
            current_line += '.';
        }
        if(pos === 40) {
            lines.push(current_line);
            current_line = '';
        }
        i++;
    }
    return lines;
}

module.exports = { day10 }