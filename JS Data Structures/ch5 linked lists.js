/*
Linked list is a dynamic data structure, can add or remove items from the list at will, and it will grow as needed. Unilke an array, we don't need to shift elements over when adding or removing them.
*/
function LinkedList() {
  let Node = function(element){ //helper class to create nodes
    this.element = element;
    this.next = null;
  };

  let length = 0; //private var that stores the number of items in the list
  let head = null; //private var that points to the first node

  this.append = function(element) { //add node to end of list
    let node = new Node(element);
    let current;
    //case 1, list is empty
    if(head === null) {
      head = node;
    } else {
    //case 2, list isn't empty
      current = head;
      while(current.next) { //traverse until you're at the last node
        current = current.next;
      }
      current.next = node;
    }
    length++;
  };
  this.insert = function(position, element) { //add node at specific point
    if(position >=0 && position <= length) {
      let node = new Node(element);
      let current = head;
      let previous;
      let index = 0;

      if(position === 0) { //case if adding at beginning
        node.next = current; //head now next in list
        head = node;
      } else { //case if adding anywhere but beginning
        while(index < position) {
          index++;
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      return true;
    } else {
      return false; //got a bad position, nothing added to list
    }
  };
  this.removeAt = function(position) { //remove node at specific point
    //case 1, remove 1st element
    if(position > -1 && position < length) { //1st position is 0
      let current = head;
      let previous;
      let index = 0;

      if(position === 0) { //remove 1st node
        head = current.next;
      } else { //case 2, remove any other element but the first
        while(index < position) {
          previous = current;
          current = current.next;
          index++;
        }
        previous.next = current.next; //skip current node in link
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.remove = function(element) { //remove node
    let index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.indexOf = function(element) { //index because on position of node
    let current = head;
    let index = 0;
    while(current) {
      if(current.element === element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  };
  this.isEmpty = function() {
    return length === 0;
  };
  this.size = function() {
    return length;
  };
  this.toString = function() { //override default toString inherited from Object.prototype to output only the element values. converts LinkedList object to a string.
    let current = head;
    let string = '';
    while(current) {
      string += current.element + (current.next ? ', ' : '');
      current = current.next;
    }
    return string;
  };
  this.getHead = function() {
    return head;
  };
  this.print = function() {
    console.log(this.toString());
  };
}

/*
Doubly linked lists. All nodes link to its element, the next node, and the previous node. With an additional tail pointer, we can also traverse from end to beginning.
*/

function DoublyLinkedList() {
  let Node = function(element) {
    this.element = element;
    this.next = null;
    this.prev = null;
  };
  let length = 0;
  let head = null;
  let tail = null;

  this.append = function(element){
    let node = new Node(element);
    let current = head;

    if(length === 0) { //case if there's nothing
      head = node;
      tail = node;
    } else {
      tail.next = node;
      node.prev = tail;
      tail = node;
    }
    length++;
  };
  this.insert = function(position, element) {
    if(position >= 0 && position <= length) {
      let node = new Node(element);
      let current = head;
      let previous;
      let index = 0;

      if(position === 0) { //case to add to 1st position
        if(!head) { //case if no head, list is empty
          head = node;
          tail = node;
        } else { //case if head exists already
          node.next = current; //next points to head
          current.prev = node; //head.prev now points back to node
          head = node; //reassign what head is
        }
      } else if(position === length) { //case to add to end of list
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else { //case to add to middle of list, could improve further by iterating from tail if position is > length/2
        while(index < position) {
          index++;
          previous = current; //prev points to head
          current = current.next; //current points to node at 1
        }
        node.next = current;
        node.prev = previous;
        previous.next = node;
        current.prev = node;
      }
      length++;
      return true;
    } else {
      return false;
    }
  };
  this.removeAt = function(position) {
    if(position >= 0 && position < length) {
      let index = 0;
      let current = head;
      let previous;

      if(position === 0) { //case if position is 0
        head = current.next;
        if(length === 1) { //case if only 1 item
          tail = null;
        } else {
          head.prev = null; //only needed if length was > 1
        }
      } else if(position === length - 1) { //remove last node
        current = tail;
        tail = current.prev;
        tail.next = null;
      } else { //case if position is in middle
        while(index < length) {
          index++;
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
      }
      length--;
      return current.element;
    } else {
      return null;
    }
  };
  this.remove = function(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };
  this.indexOf = function(element) { //could make this faster by searching from head and tail at same time
    let current = head;
    let previous;
    let index = 0;
    if(length > 0) {
      while(index < length) {
        if(current.element === element) {
          return index;
        }
        index++;
        current = current.next;
      }
    }
    return -1;
  };
  this.isEmpty = function() {
    return length === 0;
  };
  this.size = function() {
    return length;
  };
  this.toString = function() {
    let current = head;
    let s = current ? current.element : '';
    while(current && current.next) {
      current = current.next;
      s += ', ' + current.element;
    }
    return s;
  };
  this.inverseToString = function() {
    let current = tail;
    let s = current ? current.element : '';
    while(current && current.prev) {
      current = current.prev;
      s += ', ' + current.element;
    }
    return s;
  };
  this.print = function() {
    console.log(this.toString());
  };
  this.printInverse = function() {
    console.log(this.inverseToString());
  };
  this.getHead = function() {
    return head;
  };
  this.getTail = function() {
    return tail;
  };
}
