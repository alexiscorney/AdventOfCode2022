const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { Monkey } = require('../data_stuctures/Monkey');
const { Console } = require('console');

var monkeys_dict; 
const day11 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day11test.txt')));

    
    monkeys = [];
    for(let i =0; i < arr.length; i += 7) {
        monkeys.push(arr.slice(i, i+7));
    }

    console.log("GAME 1 ----")
    monkeys_dict = {};
    monkeys.forEach(m => {
        m = createMonkey(m, true);
        monkeys_dict[m.name] = [m,0];
    })
    for(let i = 1; i <= 20; i++) {
        round(monkeys_dict, true);
        console.log(`ROUND ${i}`);
        printMonkeyItems(monkeys_dict);
    }

    // console.log("FINAL");
    // printMonkeys(monkeys_dict);
    
    const part1 = getMostActive(monkeys_dict);

    console.log("GAME 2 ----")
    monkeys_dict = {};
    monkeys.forEach(m => {
        m = createMonkey(m, false);
        monkeys_dict[m.name] = [m,0];
    })
    for(let i = 1; i <= 10000; i++) {
        round(monkeys_dict);
        if(i === 1 || i === 20 || i % 1000 === 0) {
            console.log(`ROUND ${i}`);
            printMonkeys(monkeys_dict);
        }
    }

    const part2 = getMostActive(monkeys_dict);

    return { dayNumber: 11, part1: part1, part2:  part2};
})

function createMonkey(monkey, reduce) {
    const name = parseInt(monkey[0].split(' ')[1].trim().slice(0, -1));;
    const items = matchAfterPhrase(monkey[1], 'items: ')[1].split(' ').map(a => parseInt(a));
    const operation = matchAfterPhrase(monkey[2], 'new = ')[1]; 
    const test = matchAfterPhrase(monkey[3], 'divisible by ')[1];
    const t = matchAfterPhrase(monkey[4], 'throw to monkey ')[1];
    const f = matchAfterPhrase(monkey[5], 'throw to monkey ')[1];
    return m = new Monkey(name, items, operation, test, t, f, reduce);
    // console.log(m.print());

    // console.log(m.inspect(3));
    // console.log(m.applyTest(46));
}

function turn(monkey, monkeys_dict) {
    //console.log('Monkey before: ', monkey.print());
    while(monkey.items.length > 0) {
        item = monkey.getItem();
        item = monkey.inspect(item);
        [m, count] = monkeys_dict[monkey.name];
        monkeys_dict[monkey.name] = [m, count+1];
        [to, val] = monkeys_dict[monkey.applyTest(item)];
        //console.log(`giving ${item} to ${to.name}`);
        to.addItem(item);
    }
    // for(let i = 0; i <= monkey.items.length; i++) {
    //     item = monkey.getItem();
    //     item = monkey.inspect(item);
    //     to = monkeys_dict[monkey.applyTest(item)];
    //     console.log(`giving ${item} to ${to.name}`);
    //     to.addItem(item);
    // }  
    //console.log('Monkey after: ', monkey.print());
}

function round(monkeys_dict) {
    // console.log('Before round: '); 
    // printMonkeys(monkeys_dict);
    for(var [key, [monkey, count]] of Object.entries(monkeys_dict)) {
        turn(monkey, monkeys_dict);
    }
    //console.log('After round: '); 
    //printMonkeys(monkeys_dict);
}

function printMonkeys(monkey_dict) {
    for(var [key, [monkey, count]] of Object.entries(monkeys_dict)) {
        console.log(`Monkey ${monkey.name} Inspected ${count} items`)

    }
}

function printMonkeyItems(monkey_dict) {
    for(var [key, [monkey, count]] of Object.entries(monkeys_dict)) {
        console.log(`Monkey ${monkey.name} : ${monkey.items}`);
    }
}

function getMostActive(monkey_dict) {
    const counts = Object.values(monkey_dict).map(([m,c]) => c);
    const sorted = counts.sort(function(a,b) { return b - a; });
    return sorted[0] * sorted[1];
}

function matchAfterPhrase(str, phrase) {
    var regExp = new RegExp(phrase+`(.*)`);
    return str.match(regExp);
}


module.exports = { day11 }