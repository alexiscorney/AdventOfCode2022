const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { matchBetweenPhrases } = require('../utils/regexHelper');
const { Coordinate } = require('../data_stuctures/Coordinate');
const { create2DArray, log2DArray } = require('../utils/arrayHelper');

const day15 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day15test.txt')));

    //Sensor at x=3428425, y=2345067: closest beacon is at x=3431988, y=2379841
    let sensor_map = new Map();
    max_x = 0;
    max_y = 0;
    min_x = 0;
    min_y = 0;
    arr.forEach(l => {
        let sx = parseInt(matchBetweenPhrases(l, 'Sensor at x=',','));
        let sy = parseInt(matchBetweenPhrases(l, 'y=',':'));
        let bx = parseInt(matchBetweenPhrases(l, 'closest beacon is at x=',','));
        let by = parseInt(l.split('y=')[2]);
        //console.log(`sensor ${sx} ${sy} beacon ${bx} ${by}`);
        max_x = (sx > max_x) ? sx : max_x;
        min_x = (sx < min_x) ? sx : min_x;
        max_y = (sy > max_y) ? sy : max_y;
        min_y = (sy < min_y) ? sy : min_y;
        max_x = (bx > max_x) ? bx : max_x;
        min_x = (bx < min_x) ? bx : min_x;
        max_y = (by > max_y) ? by : max_y;
        min_y = (by < min_y) ? by : min_y;

        min_y -= 5;
        min_x -= 5;
        sensor_map.set(new Coordinate(sx,sy), new Coordinate(bx,by));
    })

    console.log(`x ${min_x} -> ${max_x}, y ${min_y} -> ${max_y}`);
    let grid = createSensorMap(sensor_map, min_x, min_y, max_x, max_y);
    drawSensorMap(grid, min_x, max_x, min_y, max_y, min_x, min_y);

    for (const [sensor, beacon] of sensor_map.entries()) {
        blotBeacon(sensor, beacon, grid, min_x, min_y);
        drawSensorMap(grid, min_x, max_x, min_y, max_y, min_x, min_y);
    }

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 15, part1: part1, part2:  part2};
})

function createSensorMap(sensor_map, min_x, min_y, max_x, max_y) {
    let grid = [];
    for(let i = min_y; i <= max_y; i++) {
        let row = [];
        for(let j = min_x; j<= max_x; j++) {
            row.push('-');
        }
        grid.push(row);
    }

    console.log(`grid size: y: ${grid.length} x: ${grid[0].length}`);
    for (const [sensor, beacon] of sensor_map.entries()) {
        grid[sensor.y + Math.abs(min_y)][sensor.x + Math.abs(min_x)] = 'S';
        grid[beacon.y + Math.abs(min_y)][beacon.x + Math.abs(min_x)] = 'B';
    }
    return grid;
}

function blotBeacon(sensor, beacon, grid, min_x, min_y) {
    let mh = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    console.log(`sensor ${sensor.print()} beacon ${beacon.print()} mh ${mh}`);
    for(let i = sensor.x - mh; i < sensor.x + mh; i++) {
        for(let j = sensor.y - mh; j < sensor.y + mh; j++) {
            console.log(`plotting ${i} ${j}`);
            if(isCloser(mh, sensor,i, j)) {
                grid[j + Math.abs(min_y)][i + Math.abs(min_x)] = '#';
            }
        }
    }    
}

function isCloser(mh, sensor, x, y) {
    let newmh = Math.abs(sensor.x - x) + Math.abs(sensor.y - y);  
    return newmh <= mh; 
}
function drawSensorMap(grid) {
    for(let i = 0; i < grid.length; i++) {
        console.log(`${grid[i]}`)
    }
}

function mapCoordinate(coord, min_x, min_y) {
    return [coord.x + Math.abs(min_x), coord.y + Math.abs(min_y)];

}

module.exports = { day15 }