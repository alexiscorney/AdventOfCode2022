const { default: test } = require("node:test");

class Monkey {
    constructor(name, items, operation, test, t, f, reduce = true) {
        this._name = name;
        this._items = items;
        this._operation = operation;
        this._divisor = test;
        this.createTest(test,t,f);
        this._reduce = reduce;
    }

    get items() {
        return this._items;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name
    }

    set items(items) {
        this._items = items;
    }

    getItem() {
        return this._items.shift();
    }

    addItem(item) {
        this._items.push(item);
    }

    inspect(n) {
        var op = this._operation.replace(new RegExp('old', 'g'), n);
        var res = eval(op);
        if(this._reduce) {
            return Math.floor(res/3);
        } else {
            //return Math.floor(res/3);
            return res % this._divisor;
        }
    }

    applyTest(n) {
        return this._test(n);
    }

    createTest(test, t, f) {
        const func = function(n) {
            if(n % test === 0) {
                return t;
            } else {
                return f; 
            }
        }
        this._test = func; 
    }

    print() {
        return `Monkey name: ${this._name}, has items: ${this._items}, applies operation: ${this._operation}`;
    }
}

module.exports = { Monkey }