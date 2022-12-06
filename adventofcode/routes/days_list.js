const { day1 } = require("../src/controllers/day1");
const { day2 } = require("../src/controllers/day2");
const { day3 } = require("../src/controllers/day3");
const { day4 } = require("../src/controllers/day4");
const { day5 } = require("../src/controllers/day5");
const { day6 } = require("../src/controllers/day6");

const controllers = {
    1: day1,
    2: day2,
    3: day3,
    4: day4,
    5: day5,
    6: day6,
};

module.exports = { controllers };