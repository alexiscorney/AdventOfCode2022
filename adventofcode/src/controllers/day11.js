const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { Monkey } = require('../data_stuctures/Monkey');

const day11 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day11test.txt')));
    const monkeys = [];
    for(let i =0; i < arr.length; i += 7) {
        monkeys.push(arr.slice(i, i+7));
    }
    monkeys.forEach(m => {
        createMonkey(m);
        console.log('---');
    })

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 11, part1: part1, part2:  part2};
})

function createMonkey(monkey) {
    const name = parseInt(monkey[0].split(' ')[1].trim().slice(0, -1));;
    const items = matchAfterPhrase(monkey[1], 'items: ')[1].split(' ').map(a => parseInt(a));
    const operation = matchAfterPhrase(monkey[2], 'new = ')[1]; 
    const test = matchAfterPhrase(monkey[3], 'divisible by ')[1];
    const t = matchAfterPhrase(monkey[4], 'throw to monkey ')[1];
    const f = matchAfterPhrase(monkey[5], 'throw to monkey ')[1];
    const m = new Monkey(name, items, operation, test, t, f);
    console.log(m.print());

    console.log(m.applyOperation(3));
    console.log(m.applyTest(46));
}

function matchAfterPhrase(str, phrase) {
    var regExp = new RegExp(phrase+`(.*)`);
    return str.match(regExp);
}


module.exports = { day11 }