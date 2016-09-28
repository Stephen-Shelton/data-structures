//Set creates an object called storage
//Set has 3 methods: add, contains, and remove

function Set() {
  var set = Object.create(Set.prototype);
  set.store = {};
  return set;
}

Set.prototype.add = function(item) {
  this.store[item] = item;
};

Set.prototype.contains = function(item) {
  return this.store[item] ? true : false;
};

Set.prototype.remove = function(item) {
  delete this.store[item];
};
