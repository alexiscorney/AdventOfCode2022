const { day1 } = require("../src/controllers/day1");
const { day2 } = require("../src/controllers/day2");
const { day3 } = require("../src/controllers/day3");

const controllers = {
    1: day1,
    2: day2,
    3: day3,
};

module.exports = { controllers };