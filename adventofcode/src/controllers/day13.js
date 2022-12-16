const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { chunkArray } = require('../utils/arrayHelper');
const treeify = require('treeify');

const day13 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day13.txt')));
    const pairs = chunkArray(arr, 3);

    let evals = [];
    pairs.forEach(pair => {
        let p1 = JSON.parse(pair[0]);
        let p2 = JSON.parse(pair[1]);
        //console.log(`p1 ${p1}, p2 ${p2}`);
        let res = comparePackets(p1,p2);
        evals.push(res);
        console.log(res);
    })

    let total = evals.reduce(function(acc,val,i) {
        if(val) {
            return acc + (i+1); 
        } else { return acc; }
    }, 0);

    const part1 = total;
    const part2 = 0;
    return { dayNumber: 13, part1: part1, part2:  part2};
})

function comparePackets(l, r) {
    console.log(`L: ${JSON.stringify(l)}`);
    console.log(`R: ${JSON.stringify(r)}`)
    if((l[0] === undefined || l.length === 0) && (r[0] === undefined || r.length === 0)) {
        console.log(`no conclusion`);
        return 0;
    } 
    if(l[0] === undefined || l.length === 0) {
        console.log(`left ran out`);
        return true;
    }
    if(r[0] === undefined || r.length === 0) {
        console.log(`right ran out`);
        return false;
    }
    //both integers
    if(!Array.isArray(l[0]) && !Array.isArray(r[0])) {
        console.log(`integers`);
        if(l[0] < r[0]) {
            return true;
        } else if(r[0] < l[0]) {
            return false;
        } else { 
            return comparePackets(l.splice(1), r.splice(1));
        }
    } 
    // left is integer
    else if(!Array.isArray(l[0])) {
        l[0] = [l[0]];
        return comparePackets(l, r);
    }

    // right is integer
    else if(!Array.isArray(r[0])) {
        r[0] = [r[0]];
        return comparePackets(l, r);
    }

    //both arrays 
    else {
        console.log(`both arrays`);
        let c = comparePackets(l[0], r[0]);
        if(c === 0) {
            return comparePackets(l.splice(1), r.splice(1));
        } else {
            return c;
        }
    }
}

module.exports = { day13 }