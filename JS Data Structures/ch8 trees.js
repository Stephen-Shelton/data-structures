/*
Trees consist of nodes.
- root is the node w/o a parent
- internal node is a child node with other children
- an external node (i.e. leaf) is a child node with no children
- a subtree is any child node and its descendants
- depth of a tree/node determined by how many levels of ancestors it has, e.g. parent, grandparent, etc.
- height of a tree is the max depth of any node. Root is depth 0, its child is depth 1, grandchild is depth 2, etc.
- tree nodes are referred to as keys in tree terminology

Binary Trees
- Any node has 2 children at most, a left child and a right child
- binary search trees only allow you to store lesser values on the left, and greater values on the right of a node
*/
function BinarySearchTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  var root = null;

  //private helper function for this.insert
  var insertNode = function(node, newNode) {
    if(newNode.key < node.key) {
      if(node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if(node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };
  this.insert = function(key) { //add key to tree
    var newNode = new Node(key);
    if(root === null) {
      root = newNode;
    } else {
      insertNode(root, newNode);
    }
  };
  this.search = function(key) { //returns boolean

  };
  //private helper function for this.inOrderTraverse
  var inOrderTraverse = function(node, callback) {
    if(node !== null) {
      inOrderTraverse(node.left, callback);
      callback(node.key);
      inOrderTraverse(node.right, callback);
    }
  };
  //visit all nodes from smallest to largest
  this.inOrderTraverse = function(callback) {
    inOrderTraverse(root, callback);
  };
  //private helper function for this.preOrderTraverse
  var preOrderTraverse = function(node, callback) {
    if(node !== null) {
      callback(node.key);
      preOrderTraverse(node.left, callback);
      preOrderTraverse(node.right, callback);
    }
  };
  //visits all nodes prior to its descendants, left then right
  this.preOrderTraverse = function(callback) {
    preOrderTraverse(root, callback);
  };
  //private helper function for this.postOrderTraverse
  var postOrderTraverse = function(node, callback) {
    if(node !== null) {
      postOrderTraverse(node.left, callback);
      postOrderTraverse(node.right, callback);
      callback(node.key);
    }
  };
  //visits the node after it visits its descendants
  this.postOrderTraverse = function(callback) {
    postOrderTraverse(root, callback);
  };
  //private helper function for this.min
  var minNode = function(node) {
    if(node) {
      while(node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };
  //returns min value in tree
  this.min = function() {
    return minNode(root);
  };
  //private helper function for this.max
  var maxNode = function(node) {
    if(node) {
      while(node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  };
  //returns max value in a tree
  this.max = function() {
    return maxNode(root);
  };
  //helper function for this.search
  var searchNode = function(node, key) {
    if(node === null) {
      return false;
    }
    if(key < node.key) {
      return searchNode(node.left);
    }
    if(key > node.key) {
      return searchNode(node.right);
    }
    return true;
  };
  this.search = function(key) {
    return searchNode(root, key);
  };
  //private helper function for removeNode
  var findMinNode = function(node) {
    while(node && node.left !== null) {
      node = node.left;
    }
    return node;
  };
  //private helper function for this.remove
  var removeNode = function(node, key) {
    if(node === null) {
      return null;
    }
    if(key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    }
    if(key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    }
    //case 1, key matches leaf node
    if(node.left === null && node.right === null) {
      node = null;
      return node;
    }
    //case 2, key matches node w/ 1 child
    if(node.left === null) {
      node = node.right;
      return node;
    }
    if(node.right === null) {
      node = node.left;
      return node;
    }
    //case 3, key matches node w/ 2 children
    var aux = findMinNode(node.right);
    node.key = aux.key; //min from right replaces current key
    //now have 2 nodes in tree w/ same key, so we need to remove min node from right sub-tree
    node.right = removeNode(node.right, aux.key);
    return node; //return updated node ref to its parent
  };
  //removes a key from a tree
  this.remove = function(key) {
    //must reset root because the entire tree has changed
    root = removeNode(root, key);
  };
}

/*
Depending on how many nodes you add, one edge of the tree can become very deep. To solve this we need self-balancing binary search trees, where the height of both the left and right subtree of any node differs by 1 at most.

One self-balancing tree is the Adelson-Velskii and Landi's tree (AVL tree)

Balance factor:
  - difference between the height of the right-hand side of subtree (hr) and left-hand side of subtree (hl)
  - (hr - hl) should be 0, 1, or -1 or else tree needs to be balanced

Two balancing processes that can be used when balance factor not 0/1/-1
  1) simple rotations
  2) double rotation
  - Between simple and double rotations, there's 4 scenarios
    Right-Right (RR): single rotation to the left
      e.g. 30-50-70, becomes 50-70-80, 70 shifted from right to middle
    Left-Left (LL): single rotation to the right
      e.g. 30-50-70, becomes 10-30-50, 30 shifted from left to middle
    Left-Right (LR): double rotation to the right
      e.g. 30-50-70, becomes 30-40-50, see entire tree to understand
    Right-Left (RL): double rotation to the left
      e.g. 30-50-70, becomes 30-40-50, see entire tree to understand
*/
function AVLTree() {
  var Node = function(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  var root = null;

  this.getRoot = function() {
    return root;
  };
  //helper function for insertNode to calc height of node
  var heightNode = function(node) {
    if(node === null) {
      return -1;
    }
    return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
  };
  //helper function for insertNode to rotate tree to left. can only perform when adding element to right of tree and element is largest in tree, e.g. element > node.right.right
  var rotationRR = function(node) {
    var temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
  };
  //helper function for insertNode to rotate tree to right. can only perform when adding element to left of tree and element is smallest in tree, e.g. element < node.left.left
  var rotationLL = function(node) {
    var temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  };
  //helper function for insertNode to rotate tree to right then left. can only perform when adding element to left of tree and element is smaller than node, but not the smallest.
  var rotationLR = function(node) {
    node.left = rotationRR(node.left);
    return rotationLL(node);
  };
  //helper function for insertNode to rotate tree to left then right. can only perform when adding element to right of tree and element is greater than node, but not the largest.
  var rotationRL = function(node) {
    node.right = rotationLL(node.right);
    return rotationRR(node);
  };

  var insertNode = function(node, element) {
    if(node === null) {
      node = new Node(element);
    } else if(element < node.key) {
      node.left = insertNode(node.left, element);
      if(node.left !== null) {
        //verify if left rotation is needed
        if((heightNode(node.left) - heightNode(node.right)) > 1) {
          //verify if LL rotation is needed
          if(element < node.left.key) {
            node = rotationLL(node);
          } else { //otherwise do LR rotation
            node = rotationLR(node);
          }
        }
      }
    } else if(element > node.key) {
      node.right = insertNode(node.right, element);
      if(node.right !== null) {
        //verify if right rotation is needed
        if((heightNode(node.right) - heightNode(node.left)) > 1) {
          //verify if RR rotation is needed
          if(element > node.right.key) {
            node = rotationRR(node);
          } else { //otherwise do RL rotation
            node = rotationRL(node);
          }
        }
      }
    }
    return node;
  };
  this.insert = function(element) {
    root = insertNode(root, element);
  };
  //helper/private variables for removeNode
  var parentNode;
  var nodeToBeDeleted;
  //helper function for remove
  var removeNode = function(node, element) {
    if (node === null) {
      return null;
    }
    parentNode = node;

    if (element < node.key) {
      node.left = removeNode(node.left, element);
    } else {
      nodeToBeDeleted = node;
      node.right = removeNode(node.right, element);
    }

    if (node === parentNode) { //remove node
      if (nodeToBeDeleted !== null && element === nodeToBeDeleted.key) {
        if (nodeToBeDeleted === parentNode) {
          node = node.left;
        } else {
          var tmp = nodeToBeDeleted.key;
          nodeToBeDeleted.key = parentNode.key;
          parentNode.key = tmp;
          node = node.right;
        }
      }
    } else { //do balancing
      if (node.left === undefined) node.left = null;
      if (node.right === undefined) node.right = null;

      if ((heightNode(node.left) - heightNode(node.right)) === 2) {
        if (element < node.left.key) {
          node = rotationLR(node);
        } else {
          node = rotationLL(node);
        }
      }

      if ((heightNode(node.right) - heightNode(node.left)) === 2) {
        if (element > node.right.key) {
          node = rotationRL(node);
        } else {
          node = rotationRR(node);
        }
      }
    }
    return node;
  };

  this.remove = function(element) {
    parentNode = null;
    nodeToBeDeleted = null;
    root = removeNode(root, element);
  };
}

//can also learn more about red-black trees and heap trees
//red-black trees are more efficient at balancing trees, plus arguably more simple since they only have 2 rotate functions.
function RedBlackTree() {
  //red always 0, black always 1
  var Colors = {
    RED: 0,
    BLACK: 1
  };
  //node class has added color and flipColor props
  var Node = function(key, color) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.color = color;
    //method to flip a node's color
    this.flipColor = function(){
      if (this.color === Colors.RED) {
        this.color = Colors.BLACK;
      } else {
        this.color = Colors.RED;
      }
    };
  };

  var root = null;

  this.getRoot = function () {
    return root;
  };
  //check if a node's color is red
  var isRed = function(node){
    if (!node){
      return false;
    }
    return node.color === Colors.RED;
  };
  //flip colors of left and right nodes of a given node
  var flipColors = function(node){
    node.left.flipColor();
    node.right.flipColor();
  };
  //rotate left when node.right is red and node.left is not red
  var rotateLeft = function(node){
    var temp = node.right;
    if (temp !== null) {
      node.right = temp.left;
      temp.left = node;
      temp.color = node.color;
      node.color = Colors.RED;
    }
    return temp;
  };
  //rotate right when node.left is red and node.left.left is red
  var rotateRight = function (node) {
    var temp = node.left;
    if (temp !== null) {
      node.left = temp.right;
      temp.right = node;
      temp.color = node.color;
      node.color = Colors.RED;
    }
    return temp;
  };
  //helper for this.insert, root always the argument for node
  var insertNode = function(node, element) {
    if (node === null) {
      return new Node(element, Colors.RED);
    }

    var newRoot = node;

    if (element < node.key) {
      node.left = insertNode(node.left, element);
    } else if (element > node.key) {
      node.right = insertNode(node.right, element);
    } else {
      node.key = element;
    }
    //if right is red and left is not red, rotate left
    if (isRed(node.right) && !isRed(node.left)) {
      newRoot = rotateLeft(node);
    }
    //if left is red and left's left is red, rotate right
    if (isRed(node.left) && isRed(node.left.left)) {
      newRoot = rotateRight(node);
    }
    //if left and right are red, flip them black
    if (isRed(node.left) && isRed(node.right)) {
      flipColors(node);
    }
    return newRoot;
  };

  this.insert = function(element) {
    root = insertNode(root, element);
    root.color = Colors.BLACK;
  };
}
