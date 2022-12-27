const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { Coordinate } = require('../data_stuctures/Coordinate');
const { create2DArray } = require('../utils/arrayHelper');

class Rock {
    constructor(width, height, area, position) {
        this._width = width;
        this._height = height;
        this._area = area; 
        this._bottom_left = position;
    }

    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    set width(width) {
        this._width = width;
    }
    set height(height) {
        this._height = height;
    }

    setPosition(x,y) {
        this._bottom_left = new Coordinate(x,y);
    }

    getPosition() {
        return this._bottom_left;
    }

    canMove(area, covered_area) {
        for(let i=0;i<covered_area.length; i++) {
            for(let j=0;j<area.length;j++) {
              if (covered_area[i].equals(area[j])) {
                return false;
              }
            }
          } 
        return true;
    }

    moveLeft(covered_area) {
        let left = this._bottom_left.transform(-1,0);
        if(left.x < 0) {
            return false;
        }
        let area = this._area.map(a => left.transform(a[0],a[1]));
        if(this.canMove(area, covered_area)) {
            this._bottom_left = left;
            return true;
        } else {
            return false;
        }
    }

    moveRight(covered_area) {
        let right = this._bottom_left.transform(1,0);
        if(right._x + this._width-1 > 6) {
            return false;
        }
        let area = this._area.map(a => right.transform(a[0],a[1]));
    
        if(this.canMove(area, covered_area)) {
            this._bottom_left = right;
            return true;
        } else {
            return false;
        }
    }

    moveDown(covered_area) {
        if(this._bottom_left._y-1 < 0) {
            return false;
        } else {
            let down = this._bottom_left.transform(0,-1);
            let area = this._area.map(a => down.transform(a[0],a[1]));
            if(this.canMove(area, covered_area)) {
                this._bottom_left = down;
                return true;
            } else {
                return false;
            }
        }
    }

    generateArea() {
        return this._area.map(a => this._bottom_left.transform(a[0],a[1]));
    }

    


}
const day17 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day17test.txt')))[0];

    let covered_area = [];
    let index = 0;

    const rocks = [
        new Rock(4,1,[[0,0],[1,0],[2,0],[3,0]]), 
        new Rock(3,3,[[1,0],[0,1],[1,1],[2,1],[1,2]]),
        new Rock(3,3,[[0,0],[1,0],[2,0],[2,1],[2,2]]),
        new Rock(1,4,[[0,0],[0,1],[0,2],[0,3]]),
        new Rock(2,2,[[0,0],[1,0],[0,1],[1,1]])
    ];

    let top = -1; 
    let rock_i = 0;

    // for(let i=0; i < 2022; i++) {
    //     if(rock_i === 5) {
    //         rock_i = 0;
    //     }
    //     [new_area, index, top] = spawnRock(rocks[rock_i], top, covered_area, arr, index);
    //     rock_i+=1;
    //     covered_area = covered_area.concat(new_area);
    // }
    // //plot(covered_area,top);
    // console.log(`highest point = ${top + 1}`);

    // for(let i=0; i < 10000; i++) {
    //     if(rock_i === 5) {
    //         rock_i = 0;
    //     }
    //     [new_area, index, top, finished] = spawnRock(rocks[rock_i], top, covered_area, arr, index);
    //     rock_i+=1;
    //     covered_area = covered_area.concat(new_area);
    // }
    //in between is 2597

    let moves_no = arr.length;
    console.log(`length of input = ${moves_no}`);
    
    let runs = Math.floor(1000000000000 / moves_no);
    let remainder = 1000000000000 - (runs*moves_no);
    
    //one full run of input 
     
    let running = true;
    let one_run = 0;
    while(running) {
        if(rock_i === 5) {
            rock_i = 0;
        }
        [new_area, index, top, going] = spawnRock(rocks[rock_i], top, covered_area, arr, index);
        if(going === false) {
            console.log(`index run out`);
            console.log(`height: ${top}`);
            one_run = top;
            running = false;
        } 
        rock_i++;
        covered_area = covered_area.concat(new_area);
        
    }
    console.log(`one run: ${one_run}`);

    //two full run of input 
    index = 0; 
    running = true;
    let two_run = 0;
    while(running) {
        if(rock_i === 5) {
            rock_i = 0;
        }
        [new_area, index, top, going] = spawnRock(rocks[rock_i], top, covered_area, arr, index);
        if(going === false) {
            console.log(`index run out`);
            console.log(`height: ${top}`);
            two_run = top;
            running = false;
        } 
        rock_i++;
        covered_area = covered_area.concat(new_area);
    }

    console.log(`two runs: ${two_run}`); 

    index = 0; 
    running = true;
    let three_run = 0;
    while(running) {
        if(rock_i === 5) {
            rock_i = 0;
        }
        [new_area, index, top, going] = spawnRock(rocks[rock_i], top, covered_area, arr, index);
        if(going === false) {
            console.log(`index run out`);
            console.log(`height: ${top}`);
            three_run = top;
            running = false;
        } 
        rock_i++;
        covered_area = covered_area.concat(new_area);
    }

    console.log(`three runs: ${three_run}`); 

    console.log(`every run of input adds ${three_run - two_run} height`);



    running = true;
    index = 0;
    let rest = 0;
    while(running) {
        if(rock_i === 5) {
            rock_i = 0;
        }
        [new_area, index, top, going] = spawnRock(rocks[rock_i], top, covered_area, arr, index, remainder);
        if(going === false) {
            console.log(`index run out`);
            console.log(`height: ${top}`);
            rest = top;
            running = false;
        } 
        rock_i++;
        covered_area = covered_area.concat(new_area);
    }
    rest = rest - three_run; 

    
    
    console.log(`there are ${runs} full runs and ${remainder} left over in 1000000000000`);
    console.log(`after one run ${one_run}`);
    console.log(`after two runs ${two_run}`);
    console.log(`after three runs ${three_run}`);
    console.log(`after remainder ${rest}`);

    let height_added = ((three_run - two_run - 1) * runs) + rest; 
    //console.log(runs * 2597);

    console.log(`total height ${height_added}`);
    const part1 = top + 1;
    const part2 = top + 1;
    return { dayNumber: 17, part1: part1, part2:  part2};
})

function spawnRock(rock, top, covered_area, moves, index, run_until = null) {
    rock.setPosition(2, top+4);
    let falling = true;
    let lateral = true;
    while(falling) {
        if(lateral) {
            if(index === moves.length || index === run_until) {
                console.log(`index run out`);
                console.log(`height: ${top}`);
                //plot(covered_area, top);
                return [rock.generateArea(), index, top, false];;
                index = 0;
            }
            let next_move = moves[index];
            if(next_move === '<') {
                rock.moveLeft(covered_area);
            } else {
                rock.moveRight(covered_area);
            }
            index+=1;
            lateral = false;
        } else {
            let success = rock.moveDown(covered_area);
            if(!success) {
                falling = false;
            }
            lateral = true;
        
        }
    }
    top = Math.max(top, rock.getPosition()._y + rock.height -1);
    return [rock.generateArea(), index, top, true];
}

function plot(area, max) {

    let grid = create2DArray(7,max+10,'-');
    area.forEach(element => {
        grid[element._y][element._x] = '#';
    });
    grid.reverse();
    grid.forEach(row => console.log(`${row}`));
}

module.exports = { day17 }