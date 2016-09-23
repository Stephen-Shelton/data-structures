//HashTable creates props: limit (val is integer), storage (LimitedArray(this.limit)), and size (val is integer)
//4 methods: insert, retrieve, remove, resize

function HashTable() {
  this.limit = 8;
  this.size = 0;
  //LimitedArray an object with get/set/each methods. uses an array internally to get/set/run forEach on values
  this.storage = LimitedArray(this.limit);
}
//method to insert key/value pair in hash table
HashTable.prototype.insert = function(key, value) {
  //use key and limit to get index where value will be stored
  var i = getIndexBelowMaxForKey(key, this.limit);
  //get array of [k,v] pairs at i if array already exists, if not use a blank array
  var bucket = this.storage.get(i) || [];
  //traverse bucket to see if key already used/has value
  for(var j = 0; j < bucket.length; j++) {
    var pair = bucket[j];
    if(pair[0] === key) {
      pair[1] = value; //pair w/ key exists, replace value
      return;
    }
  }
  //case if pair with key doesn't exist
  bucket.push([key,value]);
  this.storage.set(i, bucket);
  this.size++;
  //resize if size has reached capacity > 75% of limit
  if(this.size > this.limit * 0.75) {
    this.resize(this.limit * 2);
  }
};
//retrieve value from table only using key
HashTable.prototype.retrieve = function(key) {
  //use key and limit to get index where value is stored
  var i = getIndexBelowMaxForKey(key, this.limit);
  //retrieve array at index
  var bucket = this.storage.get(i) || [];
  for ( var j = 0; j < bucket.length; j++ ) {
    var pair = bucket[j];
    if( pair[0] === key ){
      return pair[1];
    }
  }
  return null;
};
//remove value only using key
HashTable.prototype.remove = function(key) {
  var i = getIndexBelowMaxForKey(key, this.limit);
  var bucket = this.storage.get(i) || [];
  for( var j = 0; j < bucket.length; j++ ){
    var pair = bucket[j];
    if( pair[0] === key ){
      bucket.splice(j, 1);
      this._size--;
      if( this._size < this._limit * 0.25 ){
        this.resize(Math.floor(this._limit/2));
      }
      return pair[1];
    }
  }
  return null;
};
//resize hash table and increase limit as necessary
HashTable.prototype.resize = function(newLimit) {
  var oldStorage = this.storage;
  this.limit = newLimit;
  this.storage = LimitedArray(this.limit);
  this.size = 0;
  var that = this; //saves context to use in nested object
  oldStorage.each((bucket) => { //.each works? underscore?
    if(!bucket) {
      return;
    }
    for( var i = 0; i < bucket.length; i++ ){
      var pair = bucket[i];
      that.insert(pair[0], pair[1]);
    }
  });
};
/*
  {
    limit: 8,
    size: 3,
    storage: {
      get: function() {...},
      set: function() {...},
      each: function() {...}
      PRIVATE VARIABLES B/C OF CLOSURE/LEXICAL SCOPE
        //holds your key value pairs!!!
        var storage = [
          [[k,v],[k,v]],
          [[k,v]],
          [[k,v],[k,v],[k,v]]
        ];
        //function verifies you're not over limit
        var checkLimit = function() {...}
    },
    prototype: {
      constructor: Function HashTable() {...},
      insert: function() {...},
      retrieve: function() {...},
      remove: function() {...},
      resize: function() {...}
    }
  }
*/
