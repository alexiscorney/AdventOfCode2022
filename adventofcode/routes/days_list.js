const { day1 } = require("../src/controllers/day1");
const { day2 } = require("../src/controllers/day2");
const { day3 } = require("../src/controllers/day3");
const { day4 } = require("../src/controllers/day4");
const { day5 } = require("../src/controllers/day5");
const { day6 } = require("../src/controllers/day6");
const { day8 } = require("../src/controllers/day6 copy");
const { day7 } = require("../src/controllers/day7");

const controllers = {
    1: day1,
    2: day2,
    3: day3,
    4: day4,
    5: day5,
    6: day6,
    7: day7,
    8: day8,
};

module.exports = { controllers };