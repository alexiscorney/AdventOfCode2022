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
        this._segments = [];
    }

    setMax(max) {
        this._max = max;
    }

    setMin(min) {
        this._min = min;
    }

    addBeacon(beacon) {
        this._beacons.push(beacon);
        //this.addSegement(beacon.x, beacon.x);
    }

    addSensor(sensor) {
        this._sensors.push(sensor);
        //this.addSegement(sensor.x, sensor.x);
    }

    addSegement(x1,x2) {
        
        if(this._segments.length === 0) {
            this._segments.push([x1,x2]);
            return;
        }

        if(x1 > this._segments[this._segments.length-1][1]) {
            this._segments.push([x1,x2]);
            return;
        }
        
        //find where to put it 
        let start = 0;
        let end = 0;
        for(let i = 0; i < this._segments.length ; i++) {
            let current_x = this._segments[i][0];
            let current_y = this._segments[i][1];
            if(x1 >= current_x) {
                start = i;
                end = i;
            }
            if(x2 <= current_x)  {
                end = i;
            }
        }
        
        if(start === end) {
            if(x1 < this._segments[start][0]) {
                this._segments[start][0] = x1;
            }
            if(x2 > this._segments[start][1]) {
                this._segments[start][1] = x2;
            }
            return;
        } else {
            if(x1 > this._segments[start][1] && x2 < this._segments[end][0]) {
                this._segments.splice(start,0,[x1,x2]);
            } else {
                let new_seg = [Math.min(x1, this._segments[start][0]), Math.max(x2, this._segments[end][1])];
                this._segments.splice(start,(end - start)+1,new_seg);
            }
        }
        
    

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

    get segments() {
        return this._segments;
    }

    print() {
        return `row: ${this._row} min: ${this._min} max ${this._max}`;
    }
}
const day15 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day15.txt')));

    let sensor_map = new Map();
    arr.forEach(l => {
        let sx = parseInt(matchBetweenPhrases(l, 'Sensor at x=',','));
        let sy = parseInt(matchBetweenPhrases(l, 'y=',':'));
        let bx = parseInt(matchBetweenPhrases(l, 'closest beacon is at x=',','));
        let by = parseInt(l.split('y=')[2]);
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
    let target_row = 2000000;
    //let target_row = 10;
    const part1 = countBlots(grid,target_row);

    //let c = new Coordinate(8,7);
    
    // for(let i = 0; i<=20; i++) {
    //     console.log(grid[i].print());
    //     console.log(grid[i].segments);

    // }
    let max_y = 4000000;

    for(let i = 3000000; i<=4000000; i++) {
        //console.log(grid[i].print());
        console.log(`segments at i ${i}`);
        console.log(grid[i].segments);

    }

    let free = findFreeSpace(max_y,grid);
    let frequency = filterFree(free);
    console.log(free);

    const part2 = frequency;

    return { dayNumber: 15, part1: part1, part2:  part2};
})


function blotBeacon(sensor, beacon, grid, min_x, min_y) {
    let mh = Math.abs(sensor.x - beacon.x) + Math.abs(sensor.y - beacon.y);
    console.log(`sensor ${sensor.print()} beacon ${beacon.print()} mh ${mh}`);
    let coords = createLoci(sensor, mh); 
    //console.log(coords);
    for(let row in coords) {
        let coord = coords[row];

        // if(row === '15' && grid[row]) {
        //     console.log(`segments before:`); 
        //     console.log(grid[row].segments);
        //     console.log(`adding: ${coord[0]} ${coord[1]}`);
        // };
        
        
        if(grid[row] === undefined) {
            let gr = new GridRow(row);
            gr.setMin(coord[0]);
            gr.setMax(coord[1]);
            gr.addSegement(coord[0], coord[1]);
            grid[row] = gr;
        } else {
            let gr = grid[row];
            if(coord[0] < gr.min) {
                gr.setMin(coord[0]);
            }
            if(coord[1] > gr.max) {
                gr.setMax(coord[1])
            }
            gr.addSegement(coord[0], coord[1]);
            grid[row] = gr;
        }
        // if(row === '15') {
        //     console.log(`segments after:`);
        //     console.log(grid[row].segments); 
        // };
        
    } 
   
}

function createLoci(sensor, mh) {
    let coords = {};
    for(let j = (sensor.y - mh); j <= (sensor.y + mh); j++) {
        
        let min_i = Math.min(sensor.x + (Math.abs(j-sensor.y) - mh), sensor.x - (Math.abs(j-sensor.y) - mh));
        let max_i = Math.max(sensor.x + (Math.abs(j-sensor.y) - mh), sensor.x - (Math.abs(j-sensor.y) - mh));
        coords[j] = [min_i, max_i];
    }
    //console.log(coords);
    //console.log(`length of coords: ${coords.length}`);
    return coords;
}



function countBlots(grid, row) {
    gr = grid[row]; 
    //console.log(`row ${row}, min ${gr.min} max ${gr.max}`);
    return gr.max - gr.min;
    //gr.beacons.length - gr.sensors.length;
}

function findFreeSpace(y, grid) {
    let free = [];
    for(let i = 0; i <= y; i++) {
        let gr = grid[i];
        let sections = gr.segments;
        if(sections.length > 1) {
            console.log(`sections greater than 1`);
            console.log(sections);

            let current_x = sections[0][1];
            for(let j=0;j<sections.length - 1;j++) {

                let next_x = sections[j+1][0];
                if((next_x - current_x) > 1) {
                    let spaces = (next_x-1 === current_x+1) ? [current_x + 1] : [current_x+1,next_x-1];
                    free.push([i,spaces]);
                }
                current_x = sections[j+1][1];
            }

        }
    }
    return free;
}

function filterFree(free) {
    if(free.length === 1) {
        let y = free[0][0];
        let x = free[0][1];
        if(x.length === 1) {
            x = x[0];
            return (x * 4000000) + parseInt(y);
        } else {
            console.log(`multiple free points`);
            return 0;
        }
    } else {
        console.log(`multiple free points`);
        return 0;
    }
}

module.exports = { day15 }