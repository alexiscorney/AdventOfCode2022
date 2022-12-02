

const { fileToArray } = require('../utils/readFile');

const day2 = ((req, res) => {
    const arr = fileToArray('/Users/adcorney/AdventOfCode2022/GIT/AdventOfCode2022/adventofcode/input /day2.txt');
    const scores_game1 = arr.map(x => playRound(x));
    const total_score_game1 = scores_game1.reduce((a,b) => a + b, 0);

    const scores_game2 = arr.map(x => playRound2(x));
    const total_score_game2 = scores_game2.reduce((a,b) => a + b, 0);

    res.json({
        "day": req.params.day,
        'part1': total_score_game1,
        'part2': total_score_game2
    });
})

const convert = ((letter) => {
    switch(letter) {
        case 'A':
        case 'X':
            return 1;
        case 'B':
        case 'Y':
            return 2;
        case 'C':
        case 'Z':
            return 3;
        default:
            return -1;
    } 
}) 

const loseMap = {
    1:3,
    2:1,
    3:2,
}

const winMap = {
    1:2,
    2:3,
    3:1
}

const playRound = ((x) => {
    round = x.split(" ");
    you = convert(round[1]);
    opponent = convert(round[0]);
    console.log(`you ${you}, opponent ${opponent}`)
    outcome = you - opponent; 
    if(outcome == -1 || outcome == 2) {
        return you; 
    } else if (outcome == -2 || outcome == 1) {
        return you + 6;
    } else {
        return you + 3;
    }
});

const playRound2 = ((x) => {
    round = x.split(" ");
    opponent = convert(round[0]);
    outcome = convert(round[1]);
    switch(outcome) {
        case 1:
            return loseMap[opponent];
        case 2: 
            return opponent + 3;
        case 3:
            return winMap[opponent] + 6;
        default:
            return -1;
    }
})

module.exports = { day2 }