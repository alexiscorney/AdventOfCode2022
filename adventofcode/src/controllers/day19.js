const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');
const { matchBetweenPhrases, matchAfterPhrase } = require('../utils/regexHelper');


const day19 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day19test.txt')));

    let blueprints = {}
    for(const row of arr) {
        let [id, robots] = createBlueprint(row);
        blueprints[id] = robots;
    }
    console.log(blueprints);

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
            console.log(parts);
            for(let i = 0; i < parts.length; i+=2) {
                cost[parts[i+1]] = parseInt(parts[i])
            }
        }
        robots[type] = cost;
    }
    return [id, robots];
}
module.exports = { day19 }