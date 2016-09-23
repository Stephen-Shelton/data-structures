function Stack() {
  var instance = {
    storage: []
  };
  _.extend(instance, stackMethods);
  return instance;
}

var stackMethods = {
  push: function(value) {
    this.storage.push(value);
  },
  pop: function() {
    return this.storage.pop();
  },
  size: function() {
    return this.storage.length;
  }
};
