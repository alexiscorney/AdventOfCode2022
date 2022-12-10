const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { create2DArray } = require('../utils/arrayHelper');

const day8 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day8.txt')));
    const grid = createGrid(arr);
    const vis_grid = createVisGrid(grid);
    const part1 = countVisible(vis_grid);
    const scene_grid = createSceneGrid(grid);
    const part2 = Math.max(...scene_grid.flat());
    return { dayNumber: 8, part1: part1, part2:  part2};
})

function createGrid(arr) {
    var grid = [];
    arr.forEach(row => {
       grid.push(row.split('').map(v => { return parseInt(v) })); 
    });
    return grid;
}

function createVisGrid(grid) {
    var vis_grid = create2DArray(grid[0].length, grid.length, 0);
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            vis_grid[i][j] = isVisible(i,j,grid);
        }
    }
    return vis_grid; 
}

function createSceneGrid(grid) {
    var scene_grid = create2DArray(grid[0].length, grid.length, 0);
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            scene_grid[i][j] = calculateScenicValue(i,j,grid);
        }
    }
    return scene_grid; 
}

function reduceRow(row) { 
    return row.reduce((a,v) => { if(v) { return a + 1} else {return a} }, 0) 
};

function countVisible(vis_grid) {
    return vis_grid.reduce((a,v) => a + reduceRow(v), 0);
}

function isVisible(x,y,grid) {
    row = grid[x];
    return (row.slice(0,y).every(i => i < row[y])) || (row.slice(y+1).every(i => i < row[y])) || (isVisibleUpDown(x,y,grid));
}

function isVisibleUpDown(x,y,grid) {
    var visible_top = true;
    for(let i = 0; i < x; i++) { 
        if(grid[i][y] >= grid[x][y]) {
            visible_top = false;
        }
    }
    var visible_bottom = true;
    for(let i = x+1; i < grid.length; i++) { 
        if(grid[i][y] >= grid[x][y]) {
            visible_bottom = false;
        }
    }
    return visible_bottom || visible_top;
}

function calculateScenicValue(x,y,grid) {
    if(x === 0 || y === 0) {
        return 0;
    }
    const val = grid[x][y];
    var i = y - 1;
    var left = 0; var right = 0; var up = 0 ; var down = 0;
    while(i >= 0) {
        left++;
        if(grid[x][i] >= val) {
            break;   
        }
        i--;
    }
    i = y + 1;
    while(i < grid[0].length) {
        right++;
        if(grid[x][i] >= val) {
            break;   
        }
        i++;
    }
    i = x-1;
    while(i >= 0) {
        up++;
        if(grid[i][y] >= val) {
            break;   
        }
        i--;
    }
    i = x+1;
    while(i < grid.length) {
        down++;
        if(grid[i][y] >= val) {
            break;   
        }
        i++;
    }
    return left * right * up * down;
}

module.exports = { day8 }