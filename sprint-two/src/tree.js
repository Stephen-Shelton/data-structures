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
