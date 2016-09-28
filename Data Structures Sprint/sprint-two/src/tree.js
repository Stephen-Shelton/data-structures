//Tree creates a node with 2 props, children and value
//Tree has 2 methods, addChild and contains

function Tree(value) {
  var tree = Object.create(Tree.prototype);
  tree.children = [];
  tree.value = value;
  return tree;
}

Tree.prototype.addChild = function(value) {
  var tree = Tree(value);
  this.children.push(tree);
};

Tree.prototype.contains = function(target) {
  var flag = false;
  function searchTree(tree) {
    if(tree.value === target) {
      flag = true;
      return;
    }
    tree.children.forEach((child) => {
      searchTree(child);
    });
  }
  searchTree(this);
  return flag;
};

/*example
 {
  value: 5,
  children: [
             {value: 4, children: []},
             {value: 3, children: []}
            ]
 }
*/

//Another Tree implementation with add'l methods
var Tree2 = function(value){
  this.value = value;
  this.children = [];
};


Tree2.prototype.addChild = function(child){
  if (!child || !(child instanceof Tree2)){
    child = new Tree2(child);
  }
  if(!this.isDescendant(child)){
    this.children.push(child);
  }else {
    throw new Error("That child is already a child of this tree");
  }
  // return the new child node for convenience
  return child;
};

Tree2.prototype.isDescendant = function(child){
  if(this.children.indexOf(child) !== -1){
    // `child` is an immediate child of this tree
    return true;
  }else{
    for(var i = 0; i < this.children.length; i++){
      if(this.children[i].isDescendant(child)){
        // `child` is descendant of this tree
        return true;
      }
    }
    return false;
  }
};

Tree2.prototype.removeChild = function(child){
  var index = this.children.indexOf(child);
  if(index !== -1){
    // remove the child
    this.children.splice(index,1);
  }else{
    throw new Error("That node is not an immediate child of this tree");
  }
};

Tree2.prototype.countLeaves = function () {
  //A leaf node is any node in the tree that has no children. countLeaves should traverse the tree, and return the number of leaf nodes the tree contains.
  var count = 0;

  var leafCheck = function(tree) {
    if(tree.children.length === 0) {
      count++;
    } else {
        for(var i = 0; i<tree.children.length; i++) {
          leafCheck(tree.children[i]);
        }
      }
  };
  leafCheck(this);
  return count;
};

Tree2.prototype.BFSelect = function(filter) {
  //BFSelect accepts a filter function, calls that function on each of the nodes in Breadth-First order, and returns a flat array of node values of the tree for which the filter returns true
  var queue = [];
  var results = [];
  var current = queue.push({tree: this, depth: 0});

  while(current = queue.shift()) {
    if(filter(current.tree.value, current.depth)) {
      results.push(current.tree.value);
    }

    current.tree.children.forEach( (child) => {
      queue.push({tree: child, depth: current.depth + 1});
    });
  }
  return results;
};


Tree2.prototype.DFSelect = function(filter) {
  //DFSelect accepts a filter cb function(value,depth), calls that function on each of the nodes in Depth First order, and returns a flat array of node values of the tree for which the filter returns true.
  var arr = [];
  var depthFirstRecurse = function(tree, depth) {
    if(filter(tree.value, depth)) {
      arr.push(tree.value);
    }
    for(var i = 0; i<tree.children.length; i++) {
      depthFirstRecurse(tree.children[i], depth+1);
    }
  };
  depthFirstRecurse(this, 0);
  return arr;
};
