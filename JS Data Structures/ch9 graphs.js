/*
graph--an abstract model of a network structure
a graph is a set of nodes/vertices connected by edges
  - vertices connected by an edge are called adjacent vertices
  - degree of vertex consists of the number of adjacent vertices
    - e.g. if A is connected to 3 vertices, A has degree 3
  - a path is a sequence of consecutive vertices (can repeat a vertex)
  - a simple path does not contain repeated vertices
  - a cycle is a simple path except for the last vertex, which is also the first vertex listed
    - e.g. A, D, C, A
  - a graph is acyclic if it does not have any cycles
  - a graph is connected if there is a path between every pair of vertices
  - a graph can be directed, where edges have a direction
  - a graph can be undirected, where edges do not have a direction
  - a graph is strongly connected if there is a path in both directions between every pair of vertices
    -  e.g. C <-> D strongly connected, A -> B not strongly connected
  - a graph can be weighted, where edges have weights
  a graph can be unweighted, edges do not have weights
*/

/*
Most common implementation is the adjacency matrix
  - each node associated with an integer, which is the array index
  - can represent the connectivity between vertices using a 2d array
  - e.g. graph with Nodes A, B, C.
    - A connected to B and C
    - B connected to A
    - C connected to A
      [
         A  B  C
       A[0, 1, 1],
       B[1, 0, 0],
       C[1, 0, 0]
      ]
  - not the greatest representation since representing 0's takes up unnecessary space, and 2d arrays are inflexible, which is problematic if the number of vertices change
*/

/*
Can represent a graph with an adjacency list
  - to represent the list of adjacent vertices, can use a list (array), linked list, hash map, or dictionary
  - e.g.
    A: B, C, D
    B: A, D
    C: A, D
    D: A, B, C
  - will use adjacency lists for implementations
*/

/*
The incidence matrix
  - each row of a matrix represents a vertex
  - each column represents an edge
  - uses a 2d array, if array[v][e] === 1 there's a relationship
  - usually used to save space and memory when we have more edges than vertices
*/
/*
Can use color-coding to denote traversal status of a vertex
  - white: vertex not been visited
  - grey: vertex has been visited, but not explored
  - black: vertex has been completely explored
2 methods to traverse graphs
  - BFS and DFS

breadth-first search (BFS) traversal, use a queue
             A        1
          /  |  \
        B    C - D    2
       / \    \ / \
      E - F    G  H   3
      |
      I               4

depth-first search (DFS) traversal, use a stack
             A          4
          /  |  \
        B    C - D      3
        / \    \ / \
        E - F    G  H   2
        |
        I               1
*/

//adjacency list using a map (dictionary)
function Graph() {
  var vertices = []; //stores names of all vertices in graph
  var adjList = new Map(); //stores adjacent lists. uses name of vertex as a key, list of adjacent vertices as a value

  this.addVertex = function(v) {
    vertices.push(v);
    adjList.set(v, []);
  };
  this.addEdge = function(v, w) {
    adjList.get(v).push(w); //only keep this line for directed graphs
    adjList.get(w).push(v); //need this line for undirected graphs
  };
  this.toString = function(){
    var s = '';
    for (var i=0; i<vertices.length; i++){
      s += vertices[i] + ' -> ';
      var neighbors = adjList.get(vertices[i]);
      for (var j=0; j<neighbors.length; j++){
        s += neighbors[j] + ' ';
      }
      s += '\n';
    }
    return s;
  };
  //helper function for traversal methods bfs and dfs
  var initializeColor = function() {
    var color = {};
    for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white';
    }
    return color;
  };
  //breadth-first search (BFS) traversal, use a queue
  this.bfs = function(v, callback) {
    var color = initializeColor(); //object, keys are for vertices, vals are 'white' for status
    var queue = new Queue();
    queue.enqueue(v); //add vertex to queue

    while(!queue.isEmpty()) { //loop as long as queue isn't empty
      var u = queue.dequeue(); //remove 1st vertex in queue, assign to u
      var neighbors = adjList.get(u); //retrieve array mapped to vertex u, assign array to neighbors
      color[u] = 'grey'; //set status of vertex to 'grey' to mark it's visited but not explored
      for (var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]; //w is a vertex linked to u
        if (color[w] === 'white') { //only visit unvisited vertices
          color[w] = 'grey'; //change color status of linked vertex to note it's been visited
          queue.enqueue(w); //add w to queue, we'll do this for all of u's neighbors
        }
      }
      color[u] = 'black'; //mark vertex as black to note it's fully explored
      if (callback) {
        callback(u);
      }
    }
  };
  //new BFS method to return object with distances from v to u and predecessors to derive shortest path from v to every other vertex u
  this.BFG = function(v) {
    var color = initializeColor(); //object w/ key for every v, every val starts w/ 'white'
    var queue = new Queue();
    var d = {}; //for storing distances between vertices
    var pred = {}; //for storing predecessors of vertices
    queue.enqueue(v);

    for(var i = 0; i < vertices.length; i++) { //make every vertex a key in d and pred. initialize their start values with 0 and null
      d[vertices[i]] = 0;
      pred[vertices[i]] = null;
    }

    while(!queue.isEmpty()) {
      var u = queue.dequeue();
      var neighbors = adjList.get(u);
      color[u] = 'grey';
      for(i = 0; i < neighbors.length; i++) {
        var w = neighbors[i];
        if(color[w] === 'white') {
          color[w] = 'grey';
          d[w] = d[u] + 1; //w vertex is key, value is d[u] + 1. we log distances here based on depth
          pred[w] = u; //key is neighbor, value is u the dequeued vertex, log predecessor for each neighbor here
          queue.enqueue(w);
        }
      }
      color[u] = 'black'; //mark dequeued vertex as black in colors object
    }
    return {
      distances: d,
      predecessors: pred
    };
  };
  //dfsVisit helper function for this.dfs
  var dfsVisit = function(u, color, callback) {
    color[u] = 'grey';
    if(callback) { //execute callback if it's provided
      callback(u); //u is a vertex
    }
    console.log('Discovered ' + u);
    var neighbors = adjList.get(u); //retrieve array of connected vertices for given vertex
    for (var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i];
      if(color[w] === 'white') {
        dfsVisit(w, color, callback);
      }
    }
    color[u] = 'black';
    console.log('explored ' + u);
  };
  //depth-first search (DFS) traversal, use a stack
  this.dfs = function(callback) {
    var color = initializeColor(); //create obj where keys are vertices and vals are 'white'

    for (var i = 0; i < vertices.length; i++) {
      if(color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, callback);
      }
    }
  };
  //helper function for DFS
  var DFSVisit = function(u, color, d, f, p){
    console.log('discovered ' + u);
    color[u] = 'grey';
    d[u] = ++time;
    var neighbors = adjList.get(u);
    for (var i=0; i<neighbors.length; i++){
      var w = neighbors[i];
      if (color[w] === 'white'){
        p[w] = u;
        DFSVisit(w,color, d, f, p);
      }
    }
    color[u] = 'black';
    f[u] = ++time;
    console.log('explored ' + u);
  };
  //helper variable to track time
  var time = 0;
  //DFS traverses all vertices, constructs a forest (collection of rooted trees), and outputs 2 arrays, discoery time and finish explorer time
  this.DFS = function(){
    var color = initializeColor();
    var d = {}; //object for # of discovered vertices
    var f = {}; //object for # of finished vertices
    var p = {}; //object for precedessors
    time = 0;

    for (var i=0; i<vertices.length; i++){
      d[vertices[i]] = 0;
      f[vertices[i]] = 0;
      p[vertices[i]] = null;
    }

    for (i=0; i<vertices.length; i++){
      if (color[vertices[i]] === 'white'){
        DFSVisit(vertices[i], color, d, f, p);
      }
    }

    return {
      discovery: d,
      finished: f,
      predecessors: p
    };
  };
}

//example of adding vertices and edges to graph
var graph = new Graph();
var myVertices = ['A','B','C','D','E','F','G','H','I'];
for (var i=0; i<myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

//example of solving shortest-path problem for a given vertex in your graph
var shortestPathA = graph.BFS(myVertices[0]);
console.log(shortestPathA);
  //output
    //distances: {A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2 , I: 3},
    //predecessors: {A: null, B: "A", C: "A", D: "A", E: "B", F: "B", G: "C", H: "D", I: "E"}
  //This means that vertex A has a distance of 1 edge from vertices B, C, and D; a distance of 2 edges from vertices E, F, G, and H; and a distance of 3 edges from vertex I.
//With the predecessor's array, we can build the path from vertex A to the other vertices using the following code:
var fromVertex = myVertices[0]; //mark your start vertex, in this case, A
for (var i = 1; i < myVertices.length; i++){ //loop through all other vertices other than A
  var toVertex = myVertices[i]; //mark your 'to' vertex
  var path = new Stack();       //create stack to store paths
  for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) { //set v to value at key v in predecessors object
    path.push(v);              //push toVertex to path array
  }
  path.push(fromVertex);       //push fromVertex to path array
  var s = path.pop();          //pop last value added to path, the fromVertex;
  while (!path.isEmpty()) {     //while path isn't empty, compile your string
    s += ' - ' + path.pop(); //compile string of paths
  }
  console.log(s); //log the string of paths
}
//output
  // A - B
  // A - C
  // A - D
  // A - B - E
  // A - B - F
  // A - C - G
  // A - D - H
  // A - B - E - I

  //if we wanted to calculate the shortest path in a weighted graph, we'd use a different algorithm. Dijkstra's algorithm solves the single-source shortest path problem. Bellman-Ford algorithm solves the single-source problem if edge weights are negative. A* search algorithm provides the shortest path for a single pair of vertices using heuristics to try to speed up the search. The Floyd-Warshall algorithm provides the shortest path for all pairs of vertices.

//example of using DFS for topological/topsort/toposort sorting for specifying the order of tasks/steps in which they're executed
  //can only be applied to DAGs (directed, acyclic graphs)
  graph = new Graph();
  myVertices = ['A','B','C','D','E','F'];
  for (i=0; i<myVertices.length; i++){
    graph.addVertex(myVertices[i]);
  }
  graph.addEdge('A', 'C');
  graph.addEdge('A', 'D');
  graph.addEdge('B', 'D');
  graph.addEdge('B', 'E');
  graph.addEdge('C', 'F');
  graph.addEdge('F', 'E');
  var result = graph.DFS();
  //sort is B - A - D - C - F - E, another result could be A - B - C - D - F - E to represent order of tasks/steps, depends on algorithm

//Dijkstra's algorithm, a greedy algorithm to solve the shortest path between a single source and all other sources. Can use it to calculate the shortest path from a graph vertex to all other vertices.
//adjacent matrix to represent a graph. 2d array for vertices A through F
var graph = [[0, 2, 4, 0, 0, 0],
             [0, 0, 1, 4, 2, 0],
             [0, 0, 0, 0, 3, 0],
             [0, 0, 0, 0, 0, 2],
             [0, 0, 0, 3, 0, 2],
             [0, 0, 0, 0, 0, 0]];
var shortestPath = new ShortestPath(graph);
var dist = shortestPath.dijkstra(0);
for (var i = 0; i < dist.length; i++){
  console.log(i + '\t\t' + dist[i]);
}
  //output for graph:
    // 0      0
    // 1      2
    // 2      3
    // 3      6
    // 4      4
    // 5      6
//Floyd-Warshall algorithm, dynamic programming algorithm to calculate shortest paths on a graph. Can find shortest path from all sources to all vertices
  //output for graph below, INF means there's no shortest path between vertex i and j
  //Another way of obtaining the same result would be to run Dijkstra's algorithm for each vertex of the graph.
  var INF = Number.MAX_SAFE_INTEGER;
  graph = [[0, 2, 4, INF, INF, INF],
          [INF, 0, 2, 4, 2, INF],
          [INF, INF, 0, INF, 3, INF],
          [INF, INF, INF, 0, INF, 2],
          [INF, INF, INF, 3, 0, 2],
          [INF, INF, INF, INF, INF, 0]];

  var shortestPath = new ShortestPath(graph);

  var dist = shortestPath.floydWarshall();

  var s = '';
  for (i = 0; i < dist.length; ++i) {
    s = '';
    for (var j = 0; j<dist.length; ++j) {
      if (dist[i][j] === INF) {
        s += "INF ";
      }
      else {
        s += dist[i][j] + "   ";
      }
    }
    console.log(s);
  }
    // 0   2   3   6   4   6
    // INF 0   1   4   2   4
    // INF INF 0   6   3   5
    // INF INF INF 0   INF 2
    // INF INF INF 3   0   2
    // INF INF INF INF INF 0

function ShortestPath(graph) {
  this.graph = graph;
  var INF = Number.MAX_SAFE_INTEGER; //same as positive infinity

  var minDistance = function(dist, visited) { //dist and visited both arrays
    var min = INF;
    var minIndex = -1;

    for (var v = 0; v < dist.length; v++){
      if (visited[v] === false && dist[v] <= min){
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  };

   this.dijkstra = function(src) {
     var dist = [];
     var visited = [];
     var length = this.graph.length;
     //initialize all distances as infinite, all visit statuses as false
     for (var i = 0; i < length; i++) {
       dist[i] = INF;
       visited[i] = false;
     }

     dist[src] = 0; //distance from source vertex to itself is 0

     for (i = 0; i < length - 1; i++) { //find shortest path for all vertices. iterate from 0 through 4 for our example
       var u = minDistance(dist, visited); //select the minimum distance vertex from the set of vertices that is not processed yet

       visited[u] = true; //mark selected vertex as true so we don't visit it twice

       for (var v = 0; v < length; v++) {
         //if shortest path found, set the new value for the shortest path
         if (!visited[v] && this.graph[u][v] !== 0 && dist[u] !== INF && dist[u] + this.graph[u][v] < dist[v]) {
           dist[v] = dist[u] + this.graph[u][v];
         }
       }
     }
     return dist; //contains shortest path value from the vertex source (src) to all other vertices of the graph
   };

   this.floydWarshall = function() {
     var dist = [];
     var length = this.graph.length;
     var i;
     var j;
     var k;
     //initiate the distance array with the value of the weight between each vertex as the minimum possible distance between i and j is the weight of these vertices
     for (i = 0; i < length; i++) {
       dist[i] = [];
       for (j = 0; j < length; j++) {
         dist[i][j] = this.graph[i][j];
       }
     }
     //Using vertices 0...k as intermediate points, the shortest path between i and j is given through k
     for (k = 0; k < length; k++) {
       for (i = 0; i < length; i++) {
         for (j = 0; j < length; j++) {
           //formula used to calculate the shortest path between i and j through vertex k
           if (dist[i][k] + dist[k][j] < dist[i][j]){
             //If a new value for the shortest path is found, we will use it
             dist[i][j] = dist[i][k] + dist[k][j];
           }
         }
       }
     }
     return dist;
  };
}

//Minimum spanning tree (MST) algorithm
//very common in network designing. Imagine you have a business with several offices and want to connect the office's phone lines with each other with a minimum total cost to save money. Which is the best way of doing this?
//This can also be applied to the island bridge problem. Consider you have an n number of islands and want to build bridges to connect each of them with a minimum cost.
//each office or island represents a vertex of a graph, and edges represent the cost
//2 main algorithms for finding MSTs: Prim's algorithm and Kruskal's algorithm
  //Prim's, a greedy algorith that finds an MST for a connected weighted and undirected graph. It finds a subset of the edges that forms a tree that includes every vertex, where the total weight of all the edges in the tree is minimized.
  //using Primm's
  var i;

  var graph = [[0, 2, 4, 0, 0, 0],
               [2, 0, 2, 4, 2, 0],
               [4, 2, 0, 0, 3, 0],
               [0, 4, 0, 0, 3, 2],
               [0, 2, 3, 3, 0, 2],
               [0, 0, 0, 2, 2, 0]];

  var parent = mst.prim();

  console.log('Edge   Weight');
  for (i = 1; i < graph.length; i++){
    console.log(parent[i] + ' - ' + i + '   ' +  graph[i][parent[i]]);
  }
  //output
    // Edge   Weight
    // 0 - 1   2
    // 1 - 2   2
    // 5 - 3   2
    // 1 - 4   2
    // 4 - 5   2

//Kruskal's algorithm is also a greedy algorithm that finds MST for a connected weighted undirected graph.
  //using Kruskal's algorithm
  parent = mst.kruskal();

  console.log('Edge   Weight');
  for (i = 1; i < graph.length; i++){
    console.log(parent[i] + ' - ' + i + '   ' +  graph[i][parent[i]]);
  }


var mst = new MinimumSpanningTree(graph);
function MinimumSpanningTree(graph) {
  this.graph = graph;
  var INF = Number.MAX_SAFE_INTEGER;
  var minKey = function (key, visited) {
    // Initialize min value
    var min = INF, minIndex;

    for (var v = 0; v < this.graph.length; v++){
      if (visited[v] === false && key[v] < min) {
        min = key[v];
        minIndex = v;
      }
    }
    return minIndex;
  };

  this.prim = function() {
    var parent = [],
        key = [],
        visited = [],
        length = this.graph.length,
        i;
    //initialize all the  keys vertices as infinite and visited as false
    for (i = 0; i < length; i++){
      key[i] = INF;
      visited[i] = false;
    }
    //set the first key as 0 so that this vertex is picked as the first vertex and parent[0] = -1 because the first node is always the root of MST
    key[0] = 0;
    parent[0] = -1;

    for (i = 0; i < length-1; i++) { //find MST for all vertices
      var u = minKey(key, visited); //select the minimum key vertex from the set of vertices that was not processed yet (the same function as we used in Dijkstra's algorithm but with a different name)
      visited[u] = true; //mark the selected vertex as visited so that we do not calculate it twice

      for (var v = 0; v < length; v++){
        if (this.graph[u][v] && visited[v] === false && this.graph[u][v] <  key[v]) { //search for minimum weight
          parent[v]  = u; //store the MST path value
          key[v] = this.graph[u][v]; //set the new cost for the MST value
        }
      }
    }
    return parent;
  };

  var find = function(i, parent){
    while(parent[i]){
      i = parent[i];
    }
    return i;
  };

  var union = function(i, j, parent){
    if(i != j) {
      parent[j] = i;
      return true;
    }
    return false;
  };

  var initializeCost = function(){
    var cost = [], length = this.graph.length;
    for (var i = 0; i < length; i++){
      cost[i] = [];
      for (var j = 0; j < length; j++){
        if (this.graph[i][j] === 0) {
          cost[i][j] = INF;
        } else {
          cost[i][j] = this.graph[i][j];
        }
      }
    }
    return cost;
  };

  this.kruskal = function(){
    var length = this.graph.length,
        parent = [], cost,
        ne = 0, a, b, u, v, i, j, min;
    //copy the adjacent matrix values to the cost array so that we can modify it without losing the original values
    cost = initializeCost();

    while(ne<length-1) { //While MST has fewer than total edges -1
      for(i = 0, min = INF; i < length; i++) { //Find edge with minimum cost
        for(j = 0; j < length; j++) {
          if(cost[i][j] < min) {
            min=cost[i][j];
            a = u = i;
            b = v = j;
          }
        }
      }
      //To avoid cycles, verify that the edge is already in MST
      u = find(u, parent);
      v = find(v, parent);
      //If edges u and v are not the same, then add it to MST
      if (union(u, v, parent)){
        ne++;
      }

      cost[a][b] = cost[b][a] = INF; //Remove the edges from the list so that we do not calculate it twice
    }
    return parent; //return MST
  };
}
