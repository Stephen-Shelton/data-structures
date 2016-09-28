function Stack() {
  this.storage = {};
  this.size1 = 0; //refers to current size and where to push next value
}

Stack.prototype.push = function(value) {
  this.storage[this.size1] = value;
  this.size1++;
};

Stack.prototype.pop = function() {
  var result = this.storage[this.size1 - 1];
  delete this.storage[this.size1 - 1];
  this.size1--;
  return result;
};

Stack.prototype.size = function() {
  return (this.size1 < 0) ? 0 : this.size1;
};
