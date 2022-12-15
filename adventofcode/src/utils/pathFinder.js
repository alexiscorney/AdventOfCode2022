
class AStarNode {
    constructor(position, parent = null) {
        this._parent = parent;
        this._position = position;
        this._f = 0;
        this._g = 0; 
        this._h = 0;
        this._neighbours = [];
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

    get position() {
        return this._position; 
    }

    get parent() {
        return this._parent;
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

    equals(other) {
        return this._position === other._position;
    }

    toString() {
        return `position ${this._position.toString()}, f: ${this._f}, g: ${this._g}, h: ${this._h}`;
    }

    // updateNeighbours(node_map, grid) {
    //     max_x = grid[0].length - 1;
    //     max_y = grid.length - 1;
    //     if(this.x < max_x) {

    //     }
    //     var inRange = ((node_position._x <= max_x) && (node_position.x >= 0) && (node_position._y <= max_y) && (node_position._y >= 0));

    // }
}

class AStar {

    constructor(grid, start, end) {
        //init grid 

        this._start = new AStarNode(start);
        this._end = new AStarNode(end);
        this._grid = grid;
        this._max_x = grid[0].length - 1;
        this._max_y = grid.length - 1;

        
    }

    search() {
        var open_list = [];
        var closed_list = [];

        open_list.push(this._start);

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

    isWalkable(current_node, new_position) {
        console.log(`new position ${new_position}`)
        var current_height = this._grid[current_node.position.y][current_node.position.x].charCodeAt(0); 
        if(current_height === 83) {
            current_height = 97;
        }
        var new_height = this._grid[new_position.y][new_position.x].charCodeAt(0);
        if(new_height === 69) {
            new_height = 122;
        }
        if(new_height === 83) {
            return false; 
        }
        var isWalkable = (new_height - current_height) <= 1;
        //console.log(` current height ${current_height}, new height ${new_height}`);
        //console.log(`walkable : ${isWalkable}`);
        return (new_height - current_height) <= 1;
    }

    withinRange(node_position) {
        var inRange = ((node_position._x <= this._max_x) && (node_position.x >= 0) && (node_position._y <= this._max_y) && (node_position._y >= 0));
        //console.log(`in range: ${inRange}`);
        return inRange;
    }

    heuristic(node) {
        var h = ((node.position.x - this._end.position.x) ** 2) + ((node.position.y - this._end.position.y) ** 2);
        console.log(`heuristic ${node.position} - ${this._end.position} = ${h}`)
        return h;
    }
}

module.exports = { AStar, AStarNode }