const { readFileSync } = require('fs');

function fileToArray(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

module.exports = { fileToArray }