function Queue() {
  var instance = {};
  var storage = {};
  var waitIndex = 1; //points to next person in line
  var servedIndex = 1; //points to person to be served

  instance.enqueue = function(value) {
    storage[waitIndex] = value;
    waitIndex++;
  }

  instance.dequeue = function() {
    var result = storage[servedIndex];
    delete storage[servedIndex];
    servedIndex++;
    return result;
  }

  instance.size = function() {
    var size = waitIndex - servedIndex;
    return (size < 0) ? 0 : size;
  }

  return instance;
}

//var aQueue = Queue();
//aQueue.enqueue(5);
