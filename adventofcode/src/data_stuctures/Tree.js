const { TreeNode } = require('../data_stuctures/TreeNode');

class Tree {
    constructor(key, value = key) {
      this.root = new TreeNode(key, value);
    }
  
    *preOrderTraversal(node = this.root) {
      yield node;
      if (node.children.length) {
        for (let child of node.children) {
          yield* this.preOrderTraversal(child);
        }
      }
    }
  
    *postOrderTraversal(node = this.root) {
      if (node.children.length) {
        for (let child of node.children) {
          yield* this.postOrderTraversal(child);
        }
      }
      yield node;
    }
    size(start) {
        var l = [];
        this.traverse(start, l);
        return l.reduce((a,c) => a + parseInt(c), 0);
    }

    traverse(node, acc) {
        if(!node) {
            return;
        }
        acc.push(node.value);
        node.children.forEach(c => {
            this.traverse(c, acc);
        })

    }

    printKeysPreOrder() {
        return [...this.preOrderTraversal()].map(x => x.key);
    }
  

    insert(node, key, value) {
        const newNode = new TreeNode(key, value, node)
        node.children.push(newNode);
        return newNode;
    }
  
    remove(key) {
      for (let node of this.preOrderTraversal()) {
        const filtered = node.children.filter(c => c.key !== key);
        if (filtered.length !== node.children.length) {
          node.children = filtered;
          return true;
        }
      }
      return false;
    }
  
    find(key) {
      for (let node of this.preOrderTraversal()) {
        if (node.key === key) { 
            return node;
        }
      }
      return undefined;
    }

    get root() {
        return this._root;
    }

    set root(r) {
        this._root = r;
    }
  }

  module.exports = { Tree }; 