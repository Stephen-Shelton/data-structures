function Queue() {
  this.storage = {};
  this.waitIndex = 1;
  this.servedIndex = 1;
}

Queue.prototype.enqueue = function(value) {
  this.storage[this.waitIndex] = value;
  this.waitIndex++;
};

Queue.prototype.dequeue = function() {
  var result = this.storage[this.servedIndex];
  delete this.storage[this.servedIndex];
  this.servedIndex++;
  return result;
};

Queue.prototype.size = function() {
  var size = this.waitIndex - this.servedIndex;
  return (size < 0) ? 0 : size;
};
