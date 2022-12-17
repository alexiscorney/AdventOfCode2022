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

    let packets = []; 
    arr.forEach(p => {
        if(p.length > 0) {
            packets.push(JSON.parse(p));
        }
    })

    let d1 = JSON.parse('[[2]]');
    let d2 = JSON.parse('[[6]]');
    packets.push(d1);
    packets.push(d2);

    packets.sort(function(x,y) {
        if(comparePackets(x,y)) {
            return -1;
        } else { return 1 };
    });

    packets.forEach(a => {
        console.log(JSON.stringify(a));
    })

    const part2 = (packets.indexOf(d1) + 1) * (packets.indexOf(d2) + 1);
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
            return comparePackets(l.slice(1), r.slice(1));
        }
    } 
    // left is integer
    else if(!Array.isArray(l[0])) {
        let temp = l;
        temp[0] = [l[0]]
        return comparePackets(temp, r);
    }

    // right is integer
    else if(!Array.isArray(r[0])) {
        let temp = r;
        temp[0] = [r[0]];
        return comparePackets(l, temp);
    }

    //both arrays 
    else {
        console.log(`both arrays`);
        let c = comparePackets(l[0], r[0]);
        if(c === 0) {
            return comparePackets(l.slice(1), r.slice(1));
        } else {
            return c;
        }
    }
}

module.exports = { day13 }