//BinarySearchTree creates an object with 3 props: value, left, right.
//3 methods: insert(val), contains(val), depthFirstLog(cb), (could also try breadthFirstLog)

function BinarySearchTree(value) {
  var bsTree = Object.create(BinarySearchTree.prototype);
  bsTree.value = value;
  bsTree.left = null;
  bsTree.right = null;
  return bsTree;
}

BinarySearchTree.prototype.insert = function(value) {
  if(value < this.value) {
    if(this.left === null) {
      this.left = BinarySearchTree(value);
    } else {
      this.left.insert(value);
    }
  } else if (value > this.value) {
    if(this.right === null) {
      this.right = BinarySearchTree(value);
    } else {
      this.right.insert(value);
    }
  } else {
    return "Tree already contains value";
  }
};

BinarySearchTree.prototype.contains = function(value) {
  if(value === this.value) {
    return true;
  } else if(value < this.value) {
    if(!this.left) {
      return false;
    } else {
      return this.left.contains(value);
    }
  } else if(!this.right) {
    return false;
  } else {
    return this.right.contains(value);
  }
};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  cb(this.value);
  if(this.left) {
    this.left.depthFirstLog(cb);
  }
  if(this.right) {
    this.right.depthFirstLog(cb);
  }
};

/*
       7
      / \
    5     9
   / \   / \
  3  6  8  11
*/
