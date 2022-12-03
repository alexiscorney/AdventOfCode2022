
const { fileToArray } = require('../utils/readFile');

const day3 = ((req, res) => {
    const arr = fileToArray('/Users/adcorney/AdventOfCode2022/GIT/AdventOfCode2022/adventofcode/input /day3.txt');
    const rucksacks = [];
    arr.forEach((a,i) => {
        rucksacks.push(Array.from(a).map(function(x) { if((x.charCodeAt(0) - 97 + 1) < 0) {
            return (x.charCodeAt(0) - 38) 
          } else { return (x.charCodeAt(0) - 97 + 1)}}))
        });
    shared_items = []
    rucksacks.forEach((a,i) => {
        const l = (a.length)/2;
        const compA = a.slice(0,l);
        const compB = a.slice(l)
        const intersect = compA.filter(val => compB.includes(val));
        shared_items.push(intersect);
    })
    total = shared_items.reduce(function(a,b) { return a + b[0]}, 0);

    elf_groups = chunk(rucksacks, 3);
    badges = [];
    elf_groups.forEach((a,i) => {
        const intersect = a[0].filter(val => (a[1].includes(val) && a[2].includes(val)));
        badges.push(intersect);
    })
    total_badges = badges.reduce(function(a,b) { return a + b[0]}, 0);
    return { dayNumber: 1, part1: total, part2:  total_badges};
})

function chunk(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

module.exports = { day3 }