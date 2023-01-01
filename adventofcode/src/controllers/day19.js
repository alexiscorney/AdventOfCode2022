const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { matchBetweenPhrases, matchAfterPhrase } = require('../utils/regexHelper');

class Round {
    constructor(time, blueprint, robots, rocks, parent = null) {
        this._time = time;
        this._blueprint = blueprint;
        this._robots = robots;
        this._rocks = rocks;
        this._parent = parent; 

        this._f = 0;
        this._g = 0; 
        this._h = 0;
    }
    get time() {
        return this._time;
    } 
    set time(time) {
        this._time = time; 
    }
    set parent(parent) { 
        this._parent = parent;
    }
    get parent() {
        return this._parent;
    }
    set robots(robots) {
        this._robots = robots;
    }
    get robots() {
        return this._robots;
    }
    set rocks(rocks) {
        this._rocks = rocks;
    }
    get rocks() {
        return this._rocks;
    }
    set blueprint(blueprint) {
        this._blueprint = blueprint;
    }
    get blueprint() {
        return this._blueprint;
    }
    get f() {
        return this._f;
    }
    get g() {
        return this._g;
    }
    get h() {
        return this._h;
    }
    set f(f) {
        this._f = f;
    }
    set g(g) {
        this._g = g;
    }
    set h(h) {
        this._h = h; 
    }
}
const day19 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day19test.txt')));

    let blueprints = {}
    for(const row of arr) {
        let [id, robots] = createBlueprint(row);
        blueprints[id] = robots;
    }
    console.log(blueprints);
    
    playBlueprint(blueprints['1']);

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 19, part1: part1, part2:  part2};
})

function createBlueprint(line) {
    line = line.trim();
    let id = matchBetweenPhrases(line, 'Blueprint ',': ');
    let splits = line.split('.');
    let robots = {};
    for(let i=0;i<splits.length-1;i++) {
        let type = matchBetweenPhrases(splits[i],'Each ',' robot').trim();
        let cost_types = splits[i].split('costs')[1].trim();
        let costs = cost_types.includes('and') ? cost_types.split('and') : [cost_types];
        let cost = {};
        for(let part of costs) {
            part = part.trim();
            let parts = part.split(' ');
            for(let i = 0; i < parts.length; i+=2) {
                cost[parts[i+1]] = parseInt(parts[i])
            }
        }
        robots[type] = cost;
    }
    return [id, robots];
}

function playBlueprint(blueprint) {
    //initialise
    let start = new Round(0,blueprint,['ore'],{ 'ore': 0, 'clay': 0, 'obsidian': 0, 'geode': 0 })
    // let rocks = { 'ore': 0, 'clay': 0, 'obsidian': 0, 'geode': 0 }
    // let robots = ['ore'];

    let collections = [];
    let open_list = [];
    let closed_list = []; 

}

function round(node) {
    console.log(`time ${node.time}`);
    
    if(node.time === 24) {
        collections.push(rocks['geode']);
        return;
    }

    //determine new robots
    let new_robots = [];
    for (let [robot_type, cost] of Object.entries(blueprint)) {
        let funds = true;
        for (let [rock_type, quantity] of Object.entries(cost)) {
            if(rocks[rock_type] < quantity) {
                funds = false;
                break;
            }
        }
        if(funds) {
            new_robots.push(robot_type);
        }
    }

    console.log(rocks);
    console.log(`funds to build ${new_robots}`);

    //collect ore
    collect(robots, rocks); 

    for(new_robot of new_robots) {
        let robots_copy = robots.slice();
        let rocks_copy = JSON.parse(JSON.stringify(rocks));
        robots_copy.push(new_robot);
        let cost = blueprint[new_robot];
        for(let [rock_type, quantity] of Object.entries(cost)) {
            console.log(`deduct ${quantity} ${rock_type}`);
            rocks_copy[rock_type] = rocks_copy[rock_type] - quantity;
        }
        round(time+1, blueprint, robots_copy, rocks_copy, collections);
    }

    round(time+1, blueprint, robots, rocks, collections);
}

function collect(robots, rocks) {
    for(robot of robots) {
        rocks[robot] += 1;
    }
}
module.exports = { day19 }