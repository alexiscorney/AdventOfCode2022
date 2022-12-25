const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { matchAfterPhrase, matchBetweenPhrases } = require('../utils/regexHelper');
const { TreeNode } = require('../data_stuctures/TreeNode');

class Valve {
    constructor(label, flow, children) {
        this.label = label;
        this.flow = flow;
        this.children = children;
    }
    get label() {
        return this._label;
    }
    set label(label) {
        this._label = label;
    }
    get flow() {
        return this._value;
    }
    set flow(flow) {
        this._flow = flow;
    }
    get children() {
        return this._children;
    }
    set children(children) {
        this._children = children;
    }

    toString() {
        return `${this._key} - ${this._flow} -> ${this._children}`;
    }
}
class GraphNode {
    constructor(valve, time = 0, parent = null, open_valves = null) {
        this.valve = valve; 
        
        this.parent = parent;

        if(open_valves) {
            this._open_valves = open_valves;
        } else {
            this._open_valves = new Set();
        }
        this.openValve(this.valve); 

        this.time = time;

        this._f = 0;
        this._g = 0; 
        this._h = 0;
    }

    get valve() {
        return this._valve;
    }
    set valve(valve) {
        this._valve = valve;
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

    get time() {
        return this._time;
    }
    set time(time) { 
      this._time = time;
    }

    get parent() {
        return this._parent;
    }
    set parent(parent) {
        this._parent = parent; 
    }

    get open_valvues() {
        return this._open_valves; 
    }
    set open_valves(valves) {
        this._open_valves = valves;
    }

    openValve(valve) {
        this._open_valves.add(valve);
    }

    calculateFlowRelease() {
        let total = 0; 
        for(let valve of this.open_valves) {
            total += valve.flow * this.time;
        }
        return total; 
    }


}
const day16 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day16test.txt')));
    let valves = initialiseValves(arr);

    console.log(`VALVES: `);
    console.log(valves);

    AStar(valves);
    //console.log(`PATHS: `);
    //createPaths(valves); 

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 16, part1: part1, part2:  part2};
})

// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
// Valve BB has flow rate=13; tunnels lead to valves CC, AA
// Valve CC has flow rate=2; tunnels lead to valves DD, BB
// Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
// Valve EE has flow rate=3; tunnels lead to valves FF, DD
// Valve FF has flow rate=0; tunnels lead to valves EE, GG
// Valve GG has flow rate=0; tunnels lead to valves FF, HH
// Valve HH has flow rate=22; tunnel leads to valve GG
// Valve II has flow rate=0; tunnels lead to valves AA, JJ
// Valve JJ has flow rate=21; tunnel leads to valve II

function initialiseValves(arr) {
    let valves = {};
    arr.forEach(row => {
        let label = matchBetweenPhrases(row, 'Valve ', ' has');
        let flow = matchBetweenPhrases(row, 'flow rate=', ';');        
        let children = row.includes('valves') ? row.split('to valves ')[1] : row.split('to valve ')[1];
        children = children.includes(',') ? children.split(',') : [children];
        children = children.map(element => {
            return element.trim();
          });
        let valve = new Valve(label, parseInt(flow), children);
        valves[label] = valve;
    });
    // arr.forEach(row => {
    //     let label = matchBetweenPhrases(row, 'Valve ', ' has');
    //     let parent = nodes[label.trim()];
    //     let children = row.includes('valves') ? row.split('to valves ')[1] : row.split('to valve ')[1];
    //     children = children.includes(',') ? children.split(',') : [children];
    //     console.log(`children: ${children}`);
    //     parent.children = children;
    //     // children.forEach(child => {
    //     //     parent.addChild(nodes[child.trim()]);
    //     // })
    // });
    return valves;
}

function AStar(valves) {
    let open_list = []; 
    let closed_list = [];
    let start = new GraphNode(valves['AA']);
    open_list.push(start); 

    while(open_list.length > 0) {
        //find the node with the least f
        let index = 0; 
        for(let i = 0; i < open_list.length; i++) {
            if(open_list[i].f < open_list[index].f) {
                index = i; 
            }
        }
        let next = open_list[index];
        open_list.splice(index, 1);

        //generate successors and set parent to next 
        //console.log(next);
        let successors = next.valve.children; 
        successors.forEach(s => {
            let successor = new GraphNode(valves[s], next, next.open_valves);
            successor.time = next.time + 1;

            //if successor is the goal stop 
            if(successor.time > 30) {
                console.log(`time's up`); 
                let path = tracePath(successor);
                console.log(`PATH: `);
                console.log(path);
                return;
            }

            //compute h and g 
            successor.g = next.g + 1;
            //heuristic is 0 for now - Djkstra 
            successor.h = successor.calculateFlowRelease; 
            successor.f = next.f + successor.h; 

            //if there is a node in the open list with the same valve but a lowe f, skip this one 
            let better_one = false;
            for(let open_node of open_list) {
                if(open_node.valve === successor.valve && open_node.f > successor.f) {
                    better_one = true;
                    break;
                }
            }
            if(!better_one) {
                for(let closed_node of closed_list) {
                    if(closed_node.valve === successor.valve && closed_node.f > successor.f) {
                        better_one = true;
                        break;
                    }
                }
            }
            if(!better_one) {
                open_list.push(successor);
            }

        })
        closed_list.push(next);
    }
}


function tracePath(node) {
    let path = [];
    let flow_release = 0; 
    while(node.parent) {
        path.push(node.valve);
        node = node.parent;
    }
    return path.reverse();
}



function createPaths(nodes) {
    //[ [total, curent_node, [open_nodes] ] ]
    let open_valves = new Set();
    //let paths = [[0, nodes['AA'], open_valves]];
    let paths = [[0, [nodes['AA']]]];
    let time = 0; 
    for(let i = 0; i < 30; i++) {
        let best = 0;
        for(path of paths) {
            best = Math.max(path[0],best);
        }
        console.log(`best at ${i} = ${best}`);
        
        paths = increasePaths(paths);
    }
    let best = 0;
    for(path of paths) {
        best = Math.max(path[0],best);
    }
    console.log(best);
} 

//let step_time

// [ [total_pressure, [list of nodes]] ] 
function increasePaths(paths, next) {
    let new_paths = [];
    if(next) {
        for(let p of paths) {
            let total = p[0];
            let path = p[1];
            //console.log(`total ${total} path ${path}`);
            let final = path[path.length - 1];
            final.children.forEach(child => {
                let new_path = path.concat([child]);
                let pressure = calculatePressure(new_path);
                new_paths.push([pressure+total, new_path]);
            });
        };
    } else {
        new_paths = paths.map(p => p[0] += calculatePressure(p[1]));
    }
    
    return new_paths;
}

function calculatePressure(path) {
    let open_valves = [...new Set(path)];
    //console.log(open_valves);
    return open_valves.reduce((acc, valve) => acc + valve.value, 0);
}

function traverse(time, node, open_valves) {
    console.log(`time: ${time}, traversing ${node.key}`);

    let pressure = calculatePressure(open_valves); 
    if(time >= 30) {
        return pressure;
    } else {
        if(!(open_valves.includes(node))) {
            open_valves.push(node);
        }
        node.children.forEach(c => {
            return pressure + traverse(time+1, c, open_valves);
        })
    }
    
}

function search() {
    let time = 0; 

    var open_list = [nodes['AA']];
    var closed_list = [];

    while(open_list.length > 0) {
        console.log(`OPEN LIST LENGTH ${open_list.length}`);
        open_list.forEach(n => {
            console.log(`node: ${n.position} - f=${n.f} h=${n.h} g=${n.g}`);
        }); 
        console.log("-------");
        //var current_node = open_list[0];
        let current_index = 0;
        for(let i = 0; i < open_list.length; i++) {
            if(open_list[i].f < open_list[current_index].f) {
                current_index = i;
            }
        }
        let current_node = open_list[current_index];
        
        //found goal
        if(current_node.equals(this._end)) {
            console.log(`found goal`);
            var path = [];
            var current = current_node;
            while(current != null) {
                path.push(current.position);
                current = current.parent;
            } 
            return path.reverse();
        }

        open_list.splice(current_index, 1);
        console.log(`current node ${current_node}`)
        closed_list.push(current_node);

        //generate children
        var children = [];
        //const adjacent_positions = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
        const adjacent_positions = [[0, -1], [0, 1], [-1, 0], [1, 0]];


        adjacent_positions.forEach(([i,j]) => {
            var node_position = current_node.position.transform(i,j);
            //within range 
            if(this.withinRange(node_position) && this.isWalkable(current_node, node_position)) {
                console.log(`new node`);
                var new_node = new AStarNode(node_position, current_node);
                children.push(new_node);
            }
            
        })

        for(const child of children) {
            for(const closed_child of closed_list) {
                if(child.equals(closed_child)) {
                    break;
                }
            }
            child.g = current_node.g + 1;
            child.h = this.heuristic(child);
            child.f = child.g + child.h;

            for(const open_node of open_list) {
                if(child.equals(open_node) && child.g > open_node.g) {
                    break;
                }
            }

            open_list.push(child);
        }
    }

    
}

module.exports = { day16 }