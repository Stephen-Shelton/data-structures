function Stack() {
  var instance = {};
  var storage = [];

  instance.push = function(value) {
    storage.push(value);
  }

  instance.pop = function() {
    return storage.pop();
  }

  instance.size = function() {
    return storage.length;
  }

  return instance;
}

//var aStack = Stack();
//var aStack.push(5);
