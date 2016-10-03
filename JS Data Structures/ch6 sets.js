/*
collection of items that are unordered and consist of unique elements
*/
function Set() {
  let items = {};
  this.add = function(value) {
    if(!this.has(value)) { //reuse this.has from below
      items[value] = value; //key and value are the same
      return true;
    }
    return false;
  };
  this.remove = function(value) {
    if(this.has(value)) {
      delete items[value];
      return true;
    }
    return false;
  };
  this.has = function(value) {
    //test if value is prop of items
    //don't use 'return value in items;' since 'in' goes up prototype chain looking for props instead of limiting search to immediate object
    return items.hasOwnProperty(value);
  };
  this.clear = function() {
    items = {};
  };
  this.size = function() {
    //Object.keys(obj) returns array of props for object
    return Object.keys(items).length;
  };
  this.values = function() {
    let values = [];
    let keys = Object.keys(items);
    for(let i = 0; i < keys.length; i++) {
      values.push(items[keys[i]]);
    }
    return values;
  };
  //use union to combine values from 2 sets in a new set
  this.union = function(otherSet) {
    let unionSet = new Set();
    let values = this.values();
    //add vals from values to unionSet
    for(let i = 0; i<values.length; i++) {
      unionSet.add(values[i]);
    }
    //add vals from otherSet to unionSet
    values = otherSet.values();
    for(let i = 0; i<values.length; i++) {
      unionSet.add(values[i]);
    }
    return unionSet;
  };
  //values that exist in both sets placed in a new set
  this.intersection = function(otherSet) {
    let set = new Set();
    let values = this.values();
    for(let i = 0; i < values.length; i++) {
      if(otherSet.has(values[i])) {
        set.add(values[i]);
      }
    }
    return set;
  };
  //values that exist in 1 set but not the other set placed in a new set (XOR logic)
  this.difference = function(otherSet) {
    let set = new Set();
    let values = this.values();
    for(let i = 0; i < values.length; i++) {
      if(!otherSet.has(values[i])) {
        set.add(values[i]);
      }
    }
    return set;
  };
  //check if current set is subset of another set
  this.subset = function(otherSet) {
    if(this.size > otherSet.size) {
      return false;
    }
    let values = this.values();
    for(let i = 0; i<values.length; i++) {
      if(!otherSet.has(values[i])) {
        return false;
      }
    }
    return true;
  };
}

/*
example of union, values from 2 sets combined in a new set

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);
setB.add(6);

let unionAB = setA.union(setB);
console.log(unionAB.values());
//logs [ 1, 2, 3, 4, 5, 6 ], note 3 added to both but only shown once
*/

/*
example of intersection, values that exist in both sets placed in a new set

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

let intersectionAB = setA.intersection(setB);
console.log(intersectionAB.values());
//logs [2, 3]
*/

/*
example of difference, values that exist in 1 set but not the other set placed in a new set (XOR logic)

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

let differenceAB = setA.difference(setB);
console.log(differenceAB.values());
//logs [1]
*/

/*
example of subset, check if one set exists in another set

let setA = new Set();
setA.add(1);
setA.add(2);

let setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);

let setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);

console.log(setA.subset(setB)); //logs true
console.log(setA.subset(setC)); //logs false
*/

/*
ES6 has its own native Set class now. Our set is based on the native es6 class.
  - ES6 Sets return an iterator for the value() method, whereas ours returns an array of values
  - Our class has a size method, vs in es6 it's a native property
  - ES6 Set does not have union, intersection, difference, and subset methods, however can simulate these:
    

*/
