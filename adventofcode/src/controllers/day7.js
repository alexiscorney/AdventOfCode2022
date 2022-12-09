const { fileToArray } = require('../utils/readFile');
const { getInputPath } = require('../utils/pathHelper');

const { Tree } = require('../data_stuctures/Tree');
const { TreeNode } = require('../data_stuctures/TreeNode');

var tree; 
var directories;

const day7 = ((req, res) => {
    const arr = Array.from(fileToArray(getInputPath('day7.txt')));

    tree = new Tree('/', 0);
    directories = []
    directories.push(tree.root);
    createTree(tree, arr, 1, tree.root);
    
    var sizes = [];
    for(n of directories) {
        sizes.push(tree.size(n));
    }    
    small_dirs = sizes.filter(s => s <= 100000);

    const needed = 30000000 - (70000000 - tree.size(tree.root));
    candidates = sizes.filter(s => s >= needed);

    candidates.sort(function(a,b) { return a - b });

    const part1 = small_dirs.reduce((a,c) => a + c, 0);;
    const part2 = candidates[0];
    return { dayNumber: 7, part1: part1, part2:  part2};
})

function createTree(tree, arr, i, current) {
    if(i >= arr.length) {
        return -1;
    }
    next = arr[i];
    parts = next.split(' ');
        switch(parts[0]) {
            case '$':
                switch(parts[1]) {
                    case 'cd':
                        if(parts[2] == '..') {
                            p = current.parent;
                            createTree(tree, arr, i+1, p);
                        }
                        else {
                            children = current.children;
                            c = children.filter(c => c.key === parts[2])[0];
                            createTree(tree, arr, i+1, c);
                        }
                        
                        break;
                    case 'ls':
                        createTree(tree, arr, i+1, current);
                        break;
                }
                break;
            case 'dir':
                directories.push(tree.insert(current, parts[1], 0));
                createTree(tree, arr, i+1, current);
                break;
            default: 
                tree.insert(current, parts[1], parts[0]);
                createTree(tree, arr, i+1, current);
                break;
        }
}

module.exports = { day7 }