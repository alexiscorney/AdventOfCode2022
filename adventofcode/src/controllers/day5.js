const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const day5 = ((req, res) => {
    const arr = fileToArray(getInputPath('day5.txt'));
    end = arr.findIndex((value) => value === '');
    stacks = configureStacks(arr, end);
    stacks = applyProcedure(arr, end, stacks);
    tops = popTops(stacks); 

    stacks_2 = configureStacks(arr, end);
    stacks_2 = applyProcedure_9001(arr, end, stacks_2); 
    tops_2 = popTops(stacks_2);
    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 5, part1: tops, part2:  tops_2};
})

function configureStacks(arr, end) {
    var stacks_config = arr.slice(0,end);
    stacks_config = stacks_config.reverse();
    stacks_config = stacks_config.map((x,i) => x.split());
    //console.log(stacks_config);
    var stacks = {}
    stacks_config[0][0].split(/(\s+)/).map((a,i) => {
        if(parseInt(a)) {
            stacks[parseInt(a)] = []; 
        }
    });
    for(let i = 1; i < end; i++) {
        row = stacks_config[i][0].split(/(.{4})/).filter(O=>O);
        for(let [key, val] of Object.entries(stacks)) {
            if(row[key-1].trim() != '') {
                console.log(row[key-1]);
                val.push(row[key-1][1]);
                stacks[key] = val;
            } 
        }
    }
    return stacks;
}

function applyProcedure(arr, start, stacks) {
    var procedures = arr.slice(start+1);
    procedures.forEach((a,i) => {
        const parts = a.split(' ');
        const q = parseInt(parts[1]);
        const from = parseInt(parts[3]);
        const to = parseInt(parts[5]);
        for(let i = 0; i < q; i++) {
            if(stacks[from].length > 0) {
                val = stacks[from].pop();
                o = stacks[to];
                if(val) {
                    o.push(val);
                    stacks[to] = o; 
                }
            }
            
        }
    })
    
    return stacks;
}

function applyProcedure_9001(arr, start, stacks) {
    var procedures = arr.slice(start+1);
    procedures.forEach((a,i) => {
        console.log(a);
        console.log(stacks);
        const parts = a.split(' ');
        const q = parseInt(parts[1]);
        const from = parseInt(parts[3]);
        const to = parseInt(parts[5]);
        val = stacks[from].splice(-q, q);
        stacks[to] = stacks[to].concat(val);
        console.log(stacks);
    });
    return stacks;
}

function popTops(stacks) {
    var tops = '';
    Object.values(stacks).forEach(a => {
        tops += a.pop();
    })
    return tops;
}

module.exports = { day5 }