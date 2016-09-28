//need Node function to create nodes
//every node has a value property and a next property
//LinkedList has 2 props, head and tail
//LinkedList has 3 methods, addToTail, removeHead, contains

function Node(value) {
  return {
    value: value,
    next: null
  };
}

function LinkedList() {
  var list = Object.create(LinkedList.prototype);
  list.head = null;
  list.tail = null;
  return list;
}

LinkedList.prototype.addToTail = function(value) {
  var node = Node(value);
  //case if head is null, 1st item head and tail point to node
  if(!this.head) {
    this.head = node;
  }
  //case if tail already exists
  if(this.tail) {
    this.tail.next = node;
  }
  this.tail = node;
};

LinkedList.prototype.removeHead = function() {
  var oldHead = this.head;
  this.head = oldHead.next;
  return oldHead.value;
};

LinkedList.prototype.contains = function(target) {
  var current = this.head;
  while(true) {
    if(current.value === target) {
      return true;
    }
    if(!current.next) {
      return false;
    }
    current = current.next;
  }
};

/*example
  {
   head: {value: 5, next: {value: 4, next: null} },
   tail: {value: 4, next: null}
  }
*/
