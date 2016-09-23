//Graph creates an object called store
  //props are node names, values are arrays containing nodes
//Graph has methods: addNode, contains, removeNode, addEdge, hasEdge, removeEdge, and forEachNode

function Graph() {
  this.store = {};
}

Graph.prototype.addNode = function(node) {
  this.store[node] = [node];
};

Graph.prototype.contains = function(node) {
  return this.store[node] ? true : false;
};

Graph.prototype.removeNode = function(node) {
  delete this.store[node];
};

Graph.prototype.addEdge = function(aNode, bNode) {
  this.store[aNode].push(bNode);
  this.store[bNode].push(aNode);
};

Graph.prototype.hasEdge = function(aNode, bNode) {
  return this.store[aNode].includes(bNode) && this.store[bNode].includes(aNode) ? true : false;
};

Graph.prototype.removeEdge = function(aNode, bNode) {
  function remove(array, target) {
    array.forEach((node, i) => {
      if(node === target) {
        array.splice(i, 1);
      }
    });
  }
  remove(this.store[aNode], bNode);
  remove(this.store[bNode], aNode);
};

Graph.prototype.forEachNode = function(cb) {
  for(var key in this.store) {
    cb(this.store[key][0]);
  }
};

/*
  model for graph:
    {
      a: [a, ...other nodes],
      b: [b, ...other nodes]
      c: [c, ...other nodes]
      etc...
    }
*/
