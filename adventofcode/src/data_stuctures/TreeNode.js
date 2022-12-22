
class TreeNode {
    constructor(key, value = key, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.children = [];
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

    set key(k) {
        this._key = k;
    }

    set value(v) {
        this._value = v;
    }

    set children(children) {
        this._children = children;
    }

    addChild(child) {
      this._children.push(child);
    }

    toString() {
      return `Node: ${this._key.toString()}, value: ${this._value.toString()}`;
    }
  }
  
  module.exports = { TreeNode }