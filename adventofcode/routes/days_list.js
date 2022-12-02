const { day1 } = require("../src/controllers/day1");
const { day2 } = require("../src/controllers/day2");

const controllers = {
    1: day1,
    2: day2,
};

module.exports = { controllers };