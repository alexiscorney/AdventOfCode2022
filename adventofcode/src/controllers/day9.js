const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { Coordinate } = require('../data_stuctures/Coordinate');

var visited; 
const day9 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day9.txt')));

    visited = new Set();
    visited = applySeries(arr);
    console.log(visited);
    const part1 = visited.size;
    const part2 = 0;
    return { dayNumber: 9, part1: part1, part2:  part2};
})

function applySeries(arr) {
    var h = new Coordinate(0,0);
    var t = new Coordinate(0,0);
    
    visited.add(`${t.x},${t.y}`);
    arr.forEach(row => {
        [direction, quantity] = row.split(' ');
        console.log(`move ${direction} by ${quantity}`);
        for(let j = 0; j < parseInt(quantity); j++) {
            console.log(`h = ${h.print()} , t = ${t.print()} -> `);
            h = moveStep(h, direction);
            t = moveTail(h,t, direction);
            console.log(`-> h = ${h.print()} , t = ${t.print()}`);
            visited.add(`${t.x},${t.y}`);
        }

    })
    return visited;
}

function moveStep(piece, direction) {
    switch(direction) {
        case 'U':
            piece.moveUp();
            return piece;
        case 'D':
            piece.moveDown();
            return piece;
        case 'L': 
            piece.moveLeft();
            return piece;
        case 'R': 
            piece.moveRight();
            return piece;
        default:
            return piece;
    }
}

function moveTail(h,t, direction) {
    if(!(Math.abs(h.x - t.x) > 1 || Math.abs(h.y - t.y) > 1)) {
        console.log('not more than 2 spaces apart');
        return t;
    }
    if(h.x === t.x) {
        console.log(`same row`); 
        return moveStep(t, direction);
    } else if (h.y === t.y) {
        console.log(`same column`); 
        return moveStep(t, direction);
    }
    else {
        if (h.x > t.x) {
            //right
            if(h.y > t.y) {
                console.log(`diagonal up right`);
                t.moveUp();
                t.moveRight();
                return t;
            } else {
                console.log(`diagonal down right`);
                t.moveDown();
                t.moveRight();
                return t;
            }
        } else {
            //left 
            if(h.y > t.y) {
                console.log(`diagonal up left`);
                t.moveUp();
                t.moveLeft();
                return t;
            } else {
                console.log(`diagonal down left`);
                t.moveDown();
                t.moveLeft();
                return t;
            }
        }
    }
}

module.exports = { day9 }