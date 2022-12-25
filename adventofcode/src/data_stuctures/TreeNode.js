
class TreeNode {
    constructor(key, value = key, parent = null, time = 0) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.children = [];
      this.time = time;
    }
  
    get isLeaf() {
      return this.children.length === 0;
    }
  
    get hasChildren() {
      return !this.isLeaf;
    }

    get key() {
        return this._key;
    }

    get value() {
        return this._value;
    }

    get children() {
        return this._children;
    }

    get time() {
      return this._time;
    }

    set key(k) {
        this._key = k;
    }

    set value(v) {
        this._value = v;
    }

    set children(children) {
        this._children = children;
    }

    set time(time) { 
      this._time = time;
    }

    addChild(child) {
      this._children.push(child);
    }

    // toString() {
    //   return `Node: ${this._key.toString()}, value: ${this._value.toString()}`;
    // }
    toString() {
      return this._key.toString() ;
    }

    isLeaf() {
      return this.children.length === 0;
    }
  }
  
  module.exports = { TreeNode }