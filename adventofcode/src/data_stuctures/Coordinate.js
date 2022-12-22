class Coordinate {
    constructor(x,y) {
        this._x = x;
        this._y = y;
    }

    moveLeft() {
        this._x = this.x - 1;
    }

    moveRight() {
        this._x = this.x + 1;
    }

    moveUp() {
        this._y = this.y + 1;
    }

    moveDown() {
        this._y = this.y - 1;
    }

    moveDiagonal(up, right) {
        if(up) {
            this.moveUp;
        } else {
            this.moveDown;
        }
        if(right) {
            this.moveRight;
        } else {
            this.moveLeft;
        }    
    }

    toString() {
        //console.log(`[${this.x}, ${this.y}]`);
        return `[${this.x}, ${this.y}]`;
    }

    transform(i,j) {
        //console.log(`transforming by ${i} ${j}`);
        return new Coordinate(this._x + i, this._y + j);
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    set x(x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }
}

module.exports = { Coordinate }