//Follows LIFO, last in first out
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) {
    this.items.push(item);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  clear() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }
  print() {
    console.log(this.items.toString());
  }
}

//instantiate the class
let stack = new Stack();

//only problem with above structure is that items are directly mutable by the user. we only want methods to be available, so we need to make items private. es6 introduced a new primitive data type, Symbol, which is immutable and can be used as an object property.

let _items = Symbol(); //declare variable as a symbol
class Stack2 {
  constructor() {
    this[_items] = [];
  }
  push(item) {
    this[_items].push(item);
  }
  pop() {
    return this[_items].pop();
  }
  peek() {
    return this[_items][this[_items].length - 1];
  }
  isEmpty() {
    return this[_items].length === 0;
  }
  clear() {
    this[_items] = [];
  }
  size() {
    return this[_items].length;
  }
  print() {
    console.log(this[_items].toString());
  }
}

//However, this approach provides a false class private property since the method Object.getOwnPropertySymbols was also introduced in ES6, and it can be used to retrieve all the property Symbols declared in the class. Can hack the Stack class and directly mutate it as follows:
  let stack2 = new Stack2();
  stack2.push(5);
  stack2.push(8);
  let objectSymbols = Object.getOwnPropertySymbols(stack2); //access stack!
  console.log(objectSymbols.length); // 1
  console.log(objectSymbols); // [Symbol()]
  console.log(objectSymbols[0]); // Symbol()
  stack2[objectSymbols[0]].push(1); //mutate the stack, big no no!
  stack2.print(); //outputs 5, 8, 1


//Can only use the WeakMap data type to ensure the items property will be private in the class. WeakMap can store a key/value pair where the key is an object and the value can be any data type.
//Must also wrap the Stack class in a closure, i.e. an outer function, so the WeakMap has scope only inside the function.
//With this approach all necessary properties are private, however it's not possible to inherit the private properties if we extend the class. it's simply a tradeoff of using es6 classes.

let Stack3 = (function() {
  const items = new WeakMap(); //declare items var as a WeakMap
  class Stack3 {
    constructor () {
      items.set(this, []); //set items value in constructor by setting 'this', a reference to the Stack class, as the key of WeakMap, and the array as its value
    }
    push(element){
      let s = items.get(this); //need to retrieve the value of items via get by passing in this as the key
      s.push(element);
    }
    pop(){
      let s = items.get(this);
      let r = s.pop();
      return r;
    }
    //other methods
  }
  return Stack3;
})();

let stack3 = new Stack3();
stack3.push(5);
stack3.items; //undefined, cannot access items directly
