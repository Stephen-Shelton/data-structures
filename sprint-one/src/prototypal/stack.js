function Stack() {
  var instance = Object.create(stackMethods);
  instance.storage = {}; //use object for storage
  instance.size1 = 0; //reflects current size of stack
  return instance;
}

var stackMethods = {
  push: function(value) {
    this.storage[this.size1] = value;
    this.size1++;
  },
  pop: function() {
    var result = this.storage[this.size1 - 1];
    delete this.storage[this.size1 - 1];
    this.size1--;
    return result;
  },
  size: function() {
    return (this.size1 < 0) ? 0 : this.size1;
  }
};
