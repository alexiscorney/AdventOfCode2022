const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { matchAfterPhrase, matchBetweenPhrases } = require('../utils/regexHelper');
const { TreeNode } = require('../data_stuctures/TreeNode');

const day16 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day16test.txt')));
    let nodes = initialiseValves(arr);
    console.log(nodes);

    const part1 = 0;
    const part2 = 0;
    return { dayNumber: 16, part1: part1, part2:  part2};
})

function initialiseValves(arr) {
    let nodes = {};
    arr.forEach(row => {
        let label = matchBetweenPhrases(row, 'Valve ', ' has');
        let flow = matchBetweenPhrases(row, 'flow rate=', ';');
        let node = new TreeNode(label, parseInt(flow));
        nodes[label] = node;
    });
    arr.forEach(row => {
        let label = matchBetweenPhrases(row, 'Valve ', ' has');
        let parent = nodes[label];
        let children = row.includes('valves') ? row.split('to valves ')[1] : row.split('to valve ')[1];
        children = children.includes(',') ? children.split(',') : [children];
        console.log(children);
        children.forEach(child => {
            parent.addChild(nodes[child.trim()]);
        })
    });
    return nodes;
}
module.exports = { day16 }