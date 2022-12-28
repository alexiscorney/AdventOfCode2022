const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { parse } = require('path/posix');

const day18 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day18test.txt')));
    var cubes = arr.map(row => row.split(',').map(a => parseInt(a)));
    let total_cubes = cubes.length;
    
    let [x_min, x_max,y_min,y_max,z_min,z_max] = getMaxMin(cubes);

    let full_cubes = generateFullCubes(x_min, x_max,y_min,y_max,z_min,z_max);

    //console.log(full_cubes);

    let pairs = generatePairs(cubes);
    let adjacent_pairs = pairs.filter(p => isAdjacent(p[0],p[1]));
    //console.log(adjacent_pairs);
    
    let adjacent_cubes = adjacent_pairs.length;
    let exposed_sides = ((total_cubes * 6) - (adjacent_cubes * 2));

    const part1 = exposed_sides;

    //filter cubes 
    cubes = arr.map(row => row.split(',').map(a => parseInt(a)));

    cubes = sortArray(cubes);
    console.log(cubes); 

    const uncontained = filterCubes(full_cubes, cubes);
    let free_cubes = checkFreeCubes(uncontained, cubes);
    let free_cubes_no = free_cubes.length;
    // console.log(free_cubes);
    console.log(`there are ${free_cubes_no} free cubes`);

    const part2 = exposed_sides - (free_cubes_no * 6);
    return { dayNumber: 18, part1: part1, part2:  part2};
})

function isAdjacent(a,b) {
    let [x,y,z] = a;
    let [i,j,k] = b;
    let sum = Math.abs(x-i) + Math.abs(y-j) + Math.abs(z-k) 
    return sum === 1;
}

function generatePairs(cubes_list) {
    let cubes = cubes_list;
    let pairs = [];
    while(cubes.length > 0) {
        let a = cubes.shift();
        for(let i=0; i<cubes.length;i++) {
            pairs.push([a, cubes[i]]);
        }
    }
    return pairs; 
}

function getMaxMin(cubes) {
    let x_min = Infinity;
    let x_max = 0;
    let y_min = Infinity; 
    let y_max = 0;
    let z_min = Infinity; 
    let z_max = 0;
    for(const [x,y,z] of cubes) {
        x_min = Math.min(x_min, x);
        x_max = Math.max(x_max, x);
        y_min = Math.min(y_min, y);
        y_max = Math.max(y_max, y);
        z_min = Math.min(z_min, z);
        z_max = Math.max(z_max, z); 
    }    
    return [x_min, x_max,y_min,y_max,z_min,z_max];
}

function generateFullCubes(x_min, x_max,y_min,y_max,z_min,z_max) {
    let full = [];
    for(let i = x_min;i<=x_max;i++) {
        for(let j = y_min;j<=y_max;j++) {
            for(let k = z_min;k<=z_max;k++) {
                full.push([i,j,k]);
            }
        }
    }
    return full;
}

function filterCubes(full_cubes, cubes) {
    let free = [];
    for(const fc of full_cubes) {
        let present = false;
        for(const c of cubes) {
            if(equal_coords(fc,c)) {
                present = true;
            }
        }
        if(!present) {
            free.push(fc);
        }
    }
    return free;
    //return full_cubes.filter(a => (cubes.filter(b => a.equal_coords(b)).length === 0));
}

function checkFreeCubes(free_cubes, cubes) {
    let free = [];
    for(cube of free_cubes) {
        let adjacents = generateAdjacentCubes(cube);
        let all_adjacent_present = true;
        for(ac of adjacents) {
            let found = false;
            for(c of cubes) {
                if(equal_coords(ac,c)) {
                    found = true;
                    break;
                }
            }
            if(!found) {
                all_adjacent_present = false;
                break;
            }
        }
        if(all_adjacent_present) {
            free.push(cube);
        }
    }
    return free;
}

function generateAdjacentCubes(cube) {
    let [x,y,z] = cube;
    return [
        [x+1,y,z],
        [x-1,y,z],
        [x,y+1,z],
        [x,y-1,z],
        [x,y,z+1],
        [x,y,z-1]
    ]
}
function equal_coords(a, b) {
    let [x,y,z] = a;
    let [i,j,k] = b;
    return ((x===i) && (y===j) && (z===k)); 
}

let cmp = function(a, b) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
}

function sortArray(array) {
    array.sort(function(c1, c2) { 
        let [a,b,c] = c1;
        let [x,y,z] = c2;
        return cmp(a,x) || cmp(b,y) || cmp(c,z)
    })
    return array; 
}

module.exports = { day18 }