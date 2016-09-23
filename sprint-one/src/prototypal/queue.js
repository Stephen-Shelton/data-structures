function Queue() {
  var instance = Object.create(queueMethods);
  instance.waitIndex = 1;
  instance.servedIndex = 1;
  instance.storage = {};
  return instance;
}

var queueMethods = {
  enqueue: function(value) {
    this.storage[this.waitIndex] = value;
    this.waitIndex++;
  },
  dequeue: function() {
    var result = this.storage[this.servedIndex];
    delete this.storage[this.servedIndex];
    this.servedIndex++;
    return result;
  },
  size: function() {
    var size = this.waitIndex - this.servedIndex;
    return (size < 0) ? 0 : size;
  }
};
