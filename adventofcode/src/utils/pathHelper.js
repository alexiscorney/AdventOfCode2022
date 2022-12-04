const path = require('path');

function createDaysRoute(dayNumber) {
    return `/days/${dayNumber}`;
}

function getInputPath(filename) {
    return path.join(__dirname, '../../input/', filename);
}
module.exports = { createDaysRoute, getInputPath }