const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { matchBetweenPhrases } = require('../utils/regexHelper');
const { Coordinate } = require('../data_stuctures/Coordinate');

class GridRow {
    constructor(row) {
        this._row = row;
        this._max = 0; 
        this._min = 0; 
        this._beacons = [];
        this._sensors = [];
    }

    setMax(max) {
        this._max = max;
    }

    setMin(min) {
        this._min = min;
    }

    addBeacon(beacon) {
        this._beacons.push(beacon);
    }

    addSensor(sensor) {
        this._sensors.push(sensor);
    }

    get max() {
        return this._max;
    }

    get min() {
        return this._min;
    }

    get beacons() {
        return this._beacons;
    }

    get sensors() {
        return this._sensors; 
    }
}
const day15 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day15.txt')));

    //Sensor at x=3428425, y=2345067: closest beacon is at x=3431988, y=2379841
    let sensor_map = new Map();
    arr.forEach(l => {
        let sx = parseInt(matchBetweenPhrases(l, 'Sensor at x=',','));
        let sy = parseInt(matchBetweenPhrases(l, 'y=',':'));
        let bx = parseInt(matchBetweenPhrases(l, 'closest beacon is at x=',','));
        let by = parseInt(l.split('y=')[2]);
        console.log(`sensor ${sx} ${sy} beacon ${bx} ${by}`);
        sensor_map.set(new Coordinate(sx,sy), new Coordinate(bx,by));
    })

    let grid = {};

    for (const [sensor, beacon] of sensor_map.entries()) {
        if(grid[sensor.y] === undefined) { 
            grid[sensor.y] = new GridRow(sensor.y);
        } 
        
        grid[sensor.y].addSensor(sensor);

        if(grid[beacon.y] === undefined) { 
            grid[beacon.y] = new GridRow(beacon.y)
        } 
        
        grid[beacon.y].addBeacon(beacon);
            
        blotBeacon(sensor, beacon, grid);
    }

    //console.log(grid);
    const part1 = countBlots(grid,2000000);

    //let c = new Coordinate(8,7);
    
    const part2 = 0;
    return { dayNumber: 15, part1: part1, part2:  part2};
})


function blotBeacon(sensor, beacon, grid, min_x, min_y) {
    let mh = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    //console.log(`sensor ${sensor.print()} beacon ${beacon.print()} mh ${mh}`);
    let coords = createLoci(sensor, mh); 
    //console.log(coords);
    for(let row in coords) {
        //console.log(row);
        let coord = coords[row];
        
        if(grid[row] === undefined) {
            let gr = new GridRow(row);
            gr.setMin(coord[0]);
            gr.setMax(coord[1]);
            grid[row] = gr;
        } else {
            let gr = grid[row];
            if(coord[0] < gr.min) {
                gr.setMin(coord[0]);
            }
            if(coord[1] > gr.max) {
                gr.setMax(coord[1])
            }
            grid[row] = gr;
        }
    } 
   
}

function createLoci(sensor, mh) {
    let coords = {};
    //console.log(`CREATE LOCI for ${sensor.print()}`);
    // let min_j = (sensor.y - mh); 
    // let max_j = (sensor.y + mh); 
    // console.log(`min j ${min_j} max j ${max_j}`); 
    for(let j = (sensor.y - mh); j <= (sensor.y + mh); j++) {
        
        let min_i = Math.min(sensor.x + (Math.abs(j-sensor.y) - mh), sensor.x - (Math.abs(j-sensor.y) - mh));
        let max_i = Math.max(sensor.x + (Math.abs(j-sensor.y) - mh), sensor.x - (Math.abs(j-sensor.y) - mh));
        coords[j] = [min_i, max_i];

        //console.log(`j ${j}`);
        // for(let i = sensor.x + (Math.abs(j-sensor.y) - mh); i <= sensor.x - (Math.abs(j-sensor.y) - mh); i++) {
        //     //console.log(`i ${i}`);
        //     j_map.set(i, '#');
        //     //coords[j][i] = '#';
        //     //coords.push([i,j]);
        // }
        // coords.set(j, j_map);
    }
    //console.log(coords);
    //console.log(`length of coords: ${coords.length}`);
    return coords;
}

function isCloser(mh, sensor, x, y) {
    let newmh = Math.abs(sensor.x - x) + Math.abs(sensor.y - y);  
    return newmh <= mh; 
}

function countBlots(grid, row) {
    gr = grid[row]; 
    console.log(`row ${row}, min ${gr.min} max ${gr.max}`);
    return gr.max - gr.min;
    //gr.beacons.length - gr.sensors.length;
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