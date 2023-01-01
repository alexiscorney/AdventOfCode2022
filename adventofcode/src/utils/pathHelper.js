const path = require('path');

function createDaysRoute(dayNumber) {
    return `/days/${dayNumber}`;
}

function getInputPath(filename) {
    return path.join(__dirname, '../../input/', filename);
}

function getPythonScript(filename) {
    return path.join(__dirname, '../python/', filename);
}
module.exports = { createDaysRoute, getInputPath, getPythonScript }