const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { create2DArray, log2DArray } = require('../utils/arrayHelper');

const day14 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day14test.txt')));

    let [grid, min_x, max_x, min_y, max_y]  = initGrid(arr);
    console.log(`max x ${max_x} max y ${max_y}`);
    log2DArray(grid, min_x-2, max_x+2, min_y-2, max_y+2);

    let fallen = false;
    let i = 0; 
    while(!fallen) {
        i++;
        fallen = dropSand(grid, 500, 0, max_y);
    }
    log2DArray(grid, min_x-3, max_x+3, min_y-3, max_y+3);
    const part1 = i-1;
    const part2 = 0;
    return { dayNumber: 14, part1: part1, part2:  part2};
})

function initGrid(arr) {
    let grid = create2DArray(600, 600, '.');
    let max_x = 0;
    let max_y = 0;
    let min_x = 600;
    let min_y = 600;
    arr.forEach(l => {
        let splits = l.split(' -> ');
        let i = 0; 
        let current_x = 0; 
        let current_y = 0;
        while(i<splits.length) {
            let split = splits[i].split(',');
            let x = parseInt(split[0]);
            let y = parseInt(split[1]);
            if(i === 0) {
                current_x = x; 
                current_y = y;
            }
            //draw x 
            if(x > current_x) {
                for(let j= current_x; j <= x; j++) {
                    grid[current_y][j] = '#';
                }
            }
            if(current_x > x) {
                for(let j= x; j <= current_x; j++) {
                    grid[current_y][j] = '#';
                }
            }

            //draw y 
            if(y > current_y) {
                for(let j= current_y; j <= y; j++) {
                    grid[j][current_x] = '#';
                }
            }
            if(current_y > y) {
                for(let j= y; j <= current_y; j++) {
                    grid[j][current_x] = '#';
                }
            }
            current_x = x; 
            current_y = y;

            max_x = (current_x > max_x) ? current_x : max_x;
            max_y = (current_y > max_y) ? current_y : max_y;
            min_x = (current_x < min_x) ? current_x : min_x;
            min_y = (current_y < min_y) ? current_y : min_y;
            
            i++;

        }
    })
    return [grid, min_x, max_x, min_y, max_y]; 
}

function dropSand(grid, start_x, start_y, max_y) {
    //temp_grid = grid;
    let falling = true; 
    let x = start_x;
    let y = start_y;
    while(falling) {
        if(y >= max_y) {
            falling = false;
        }
        //try drop
        if(canFall(grid, x, y+1)) {
            y = y+1;
            //temp_grid[y+1][x] = 'o';
        } else if(canFall(grid, x-1, y+1)) {
            x = x-1;
            y = y+1;
            //temp_grid[y+1][x-1] = 'o';

        } else if(canFall(grid, x+1, y+1)) {
            x = x+1;
            y = y+1;
            //temp_grid[y+1][x+1] = 'o';
        } else {
            grid[y][x] = 'o';
            falling = false;
        }
    }
    if(y >= max_y) {
        return true;
    } else {
        return false;
    }
}

function canFall(grid, x, y) {
    return grid[y][x] === '.';
}
module.exports = { day14 }