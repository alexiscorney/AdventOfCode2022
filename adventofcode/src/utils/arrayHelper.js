function create2DArray(width, height, fill) {
    return Array(height).fill().map(() => Array(width).fill(fill));
}

function log2DArray(grid, start_x, end_x, start_y, end_y) {
    console.log(`0: ${Array.apply(0, Array(end_x - start_x + 1)).map((element, index) => index + start_x)}`)
    for(let i = start_y; i < end_y; i++) {
        console.log(`${i}: ${grid[i].slice(start_x, end_x)}`);
    }
}

function chunkArray(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

module.exports = { create2DArray, log2DArray, chunkArray }