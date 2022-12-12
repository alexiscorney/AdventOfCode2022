
class Monkey {
    constructor(name, items, operation, test, t, f) {
        this._name = name;
        this._items = items;
        this._operation = operation;
        this.createTest(test,t,f);
    }

    get items() {
        return this.items;
    }

    applyOperation(n) {
        var op = this._operation.replace(new RegExp('old', 'g'), n);
        console.log(`applying operation ${op}`);
        return eval(op);
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
        return `Monkey name: ${this._name}, has items: ${this._items}, applies operation: ${this._operation}, runs test ${this._test}`;
    }
}

module.exports = { Monkey }