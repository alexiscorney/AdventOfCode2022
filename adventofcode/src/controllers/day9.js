const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { Coordinate } = require('../data_stuctures/Coordinate');

const day9 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day9.txt')));
    var visited = applySeries(arr);
    const part1 = visited.size;
    var visited2 = applySeries2(arr);
    const part2 = visited2.size;
    
    return { dayNumber: 9, part1: part1, part2:  part2};
})

function applySeries(arr) {
    var h = new Coordinate(0,0);
    var t = new Coordinate(0,0);
    var visited = new Set();
    visited.add(`${t.x},${t.y}`);
    arr.forEach(row => {
        [direction, quantity] = row.split(' ');
        for(let j = 0; j < parseInt(quantity); j++) {
            h = moveStep(h, direction);
            t = moveTail(h,t, direction);
            visited.add(`${t.x},${t.y}`);
        }

    })
    return visited;
}

function applySeries2(arr) {
    knots = [];
    for(let i = 0; i < 10; i++) {
        knots.push(new Coordinate(0,0));
    }
    var visited = new Set();
    visited.add(`${knots[9].x},${knots[9].y}`);
    arr.forEach(row => {
        [direction, quantity] = row.split(' ');
        for(let j = 0; j < parseInt(quantity); j++) {
            knots[0] = moveStep(knots[0], direction);
            for(let i = 1; i < knots.length; i++) {
                knots[i] = moveTail(knots[i-1],knots[i], direction);
            }
            visited.add(`${knots[9].x},${knots[9].y}`);
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
        return t;
    }
    if(h.x === t.x) {
        if(h.y > t.y) {
            direction = 'U';
        }
        else {
            direction = 'D';
        }
        return moveStep(t, direction);
    } else if (h.y === t.y) {
        if(h.x > t.x) {
            direction = 'R';
        }
        else {
            direction = 'L';
        }
        return moveStep(t, direction);
    } else {
        if (h.x > t.x) {
            if(h.y > t.y) {
                t.moveUp();
                t.moveRight();
                return t;
            } else {
                t.moveDown();
                t.moveRight();
                return t;
            }
        } else {
            if(h.y > t.y) {
                t.moveUp();
                t.moveLeft();
                return t;
            } else {
                t.moveDown();
                t.moveLeft();
                return t;
            }
        }
    }
}

module.exports = { day9 }