/*
Dictionary/map is used to store key/value pairs, very similar to a set. Sets store [key, key] collection of elements, map stores [key, value] collection of elements.

Similar to Set, ES6 also has an implementation of a Map class. We can create one based on it.

ES6 Map class methods for values and keys returns an iterator instead of an array with values or keys, and size is a property instead of a method.
*/
function Map() {
  var items = {};
  this.set = function(key,value) { //add key/val to map
    items[key] = value;
  };
  this.delete = function(key) { //delete val given key
    if(this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };
  this.has = function(key) { //boolean given a key
    return items.hasOwnProperty(key);
  };
  this.get = function(key) { //retrieve val with key
    return this.has(key) ? items[key] : undefined;
  };
  this.clear = function() { //reset obj to {}
    items = {};
  };
  this.size = function() { //gives # of items in object
    return Object.keys(items).length;
  };
  this.keys = function() { //returns array of keys
    return Object.keys(items);
  };
  this.values = function() { //returns array of values
    let values = [];
    for(var k in items) {
      if(this.has(k)) {
        values.push(items[k]);
      }
    }
    return values;
  };
  this.getItems = function() {
    return items;
  };
}

/*
ES6 WeakMap and WeakSet classes.
Differences between native es6 map or set and their 'weak' versions
  - WeakSet or WeakMap classes do not have the entries, keys, and values methods
  - only possible to use Objects as a key (weakly typed), so no strong references to the keys
  - can only retrieve a value if you have its key since these classes don't have iterator methods (which allow you to retrieve values without keys)
  - thus Weak classes are better for encapsulating the private properties of es6 classes
*/
//example of using WeakMap (same logic applies to WeakSet)
var map = new WeakMap();

var ob1 = {name:'Gandalf'},
    ob2 = {name:'John'},
    ob3 = {name:'Tyrion'};

//can only use object literals as keys, not primitives
map.set(ob1, 'gandalf@email.com');
map.set(ob2, 'johnsnow@email.com');
map.set(ob3, 'tyrion@email.com');

console.log(map.has(ob1));  //outputs true
console.log(map.get(ob3)); //outputs tyrion@email.com
map.delete(ob2);

/*
Hash Tables/Hash Maps. Uses hash functions where given a key, the function returns an address in the table where the value is. For a simple hashing function, we can use the 'lose lose hash function' which sums up ASCII values of each character of the key length.
  e.g. if key is John, hash function returns 74+111+104+110=399, at position 399 the value for John is stored.
*/
//this table does NOT handle collisions
function HashTable() {
  //private hashing function
  var loseloseHashCode = function(key) {
    var hash = 0;
    for(var i = 0; i<key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37; //37 arbitrary, but lets us work with lower numbers. E.g. if key is 'John', 399 % 37 is 29
  };

  var table = [];

  //updates or adds new val to table
  this.put = function(key,value) {
    var position = loseloseHashCode(key);
    console.log(position + ' - ' + key);
    table[position] = value;
  };
  //removes val from hash table via key
  this.remove = function(key) {
    table[loseloseHashCode(key)] = undefined;
  };
  //retrieves val from hash table via key
  this.get = function(key) {
    return table[loseloseHashCode(key)];
  };
  this.print = function() {
    for(var i = 0; i<table.length; i++) {
      if(table[i] !== undefined) {
        console.log(`${i}: ${table[i]}`);
      }
    }
  };
}

/*
Hash table vs Hash set
Hash sets consist of a set, but to insert, remove, or get elements we use a hash function. Instead of adding a key/value pair, we would insert only the value, not the key. Hash sets only store unique values.
*/


/*
Handling collisions part 1
If more than 1 key results in the same position, we have a collision. Need to address!
1) separate chaining technique
  - consists of creating a linked list for each position of the table and storing elements in it.
  - simplist technique, but it requires additional memory outside the HashTable instance
  [...
    {value: 'a', next: null},
    ...,
    {value: 'b', next: {value: 'c', next: null}},
    ...
  ]
*/
//handles collisions via separate chaining
function HashTable() {
  //private hashing function
  var loseloseHashCode = function(key) {
    var hash = 0;
    for(var i = 0; i<key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37; //37 arbitrary, but lets us work with lower numbers. E.g. if key is 'John', 399 % 37 is 29
  };

  //helper class to represent element we'll add to LinkedList instance. Stores key/value in an object
  var ValuePair = function(key,value) {
    this.key = key;
    this.value = value;
    this.toString = function() { //helps output results
      return `[${this.key}: ${this.value}]`;
    };
  };

  var table = [];

  //updates or adds new val to table
  this.put = function(key,value) {
    var position = loseloseHashCode(key);
    if(table[position] === undefined) {
      table[position] = new LinkedList();
    }
    table[position].append(new ValuePair(key, value));
    //e.g. {element: {key: 'a', value: 1, toString: ...}, next: null}
  };
  //removes val from hash table via key
  this.remove = function(key) {
    var position = loseloseHashCode(key);
    var list = table[position];
    if(list !== undefined) {
      var index = 0;
      var current = list.getHead();
      while(index < list.size()) {
        if(current.element.key === key) {
          list.removeAt(index);
          if(list.isEmpty()) {
            table[position] = undefined;
          }
          return true;
        }
        current = current.next;
        index++;
      }
    }
    return false;
  };
  //retrieves val from hash table via key
  this.get = function(key) {
    var position = loseloseHashCode(key);
    var list = table[position];
    if(list !== undefined) {
      var index = 0;
      var current = list.getHead();
      while(index < list.size()) {
        if(current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  };
  this.print = function() {
    for(var i = 0; i<table.length; i++) {
      if(table[i] !== undefined) {
        console.log(`${i}: ${table[i]}`);
      }
    }
  };
}

/*
Handling collisions part 2
If more than 1 key results in the same position, we have a collision. Need to address!
2) Linear Probing
  - when we add an element, we check if the index is occupied. If yes, we try index+1 until we find an unoccupied index
*/

//handles collisions via separate chaining
function HashTable() {
  //private hashing function
  var loseloseHashCode = function(key) {
    var hash = 0;
    for(var i = 0; i<key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37; //37 arbitrary, but lets us work with lower numbers. E.g. if key is 'John', 399 % 37 is 29
  };

  //helper class to store key/value in an object
  var ValuePair = function(key,value) {
    this.key = key;
    this.value = value;
    this.toString = function() { //helps output results
      return `[${this.key}: ${this.value}]`;
    };
  };

  var table = [];

  //updates or adds new val to table
  this.put = function(key,value) {
    var position = loseloseHashCode(key);
    if(table[position] === undefined) {
      table[position] = new ValuePair(key,value);
    } else {
      position += 1;
      while(table[position]) {
        position += 1;
      }
      table[position] = new ValuePair(key,value);
    }
  };
  //removes val from hash table via key
  this.remove = function(key) {
    var position = loseloseHashCode(key);
    if(table[position] !== undefined) {
      if(table[position].key === key) {
        table[position] = undefined;
        return true;
      } else {
        position++;
        while(table[position]) {
          if(table[position].key === key) {
            table[position] = undefined;
            return true;
          }
          position++;
        }
      }
    }
    return false;
  };
  //retrieves val from hash table via key
  this.get = function(key) {
    var position = loseloseHashCode(key);
    if(table[position] !== undefined) {
      if(table[position].key === key) {
        return table[position].value;
      } else {
        position++;
        while(table[position]) {
          if(table[position].key === key) {
            return table[position].value;
          }
          position++;
        }
      }
    }
    return undefined;
  };
  this.print = function() {
    for(var i = 0; i<table.length; i++) {
      if(table[i] !== undefined) {
        console.log(`${i}: ${table[i]}`);
      }
    }
  };
}

/*
Creating better hash functions
  - loselose hash function not good bc it creates too many collisions
  - good hash functions are comprised of the following:
    - time to insert is short, ideally constant
    - time to retrieve is short, ideally constant
    - low probability of collisions
  - another good hash function is djb2
*/
//djb2 hash function
var djb2HashCode = function(key) {
  var hash = 5381; //initialize w/ large prime number
  for(var i = 0; i<key.length; i++) {
    //33 is an arbitrary 'magical' number
    hash = hash * 33 + key.charCodeAt(i);
  }
  return hash % 1013; //1013 another random, large prime #
};
