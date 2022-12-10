function create2DArray(width, height, fill) {
    return Array(height).fill().map(() => Array(width).fill(fill));
}

module.exports = { create2DArray }