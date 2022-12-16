function create2DArray(width, height, fill) {
    return Array(height).fill().map(() => Array(width).fill(fill));
}

function chunkArray(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

module.exports = { create2DArray, chunkArray }