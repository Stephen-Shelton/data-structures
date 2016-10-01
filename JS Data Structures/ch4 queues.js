//only difference between Queue and Stack are dequeue and front methods.
//Queue is FIFO, first in, first out
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(item) {
    this.items.push(item);
  }
  dequeue() {
    return this.items.shift();
  }
  front() {
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  print() {
    console.log(this.items.toString());
  }
}

//ensuring items remains private with WeakMap and closure
let Queue2 = (function () {

  const items = new WeakMap();

  class Queue2 {
    constructor () {
      items.set(this, []);
    }
    enqueue(element) {
      let q = items.get(this);
      q.push(element);
    }
    dequeue() {
      let q = items.get(this);
      let r = q.shift();
      return r;
    }
    //other methods
  }
  return Queue2;
})();

/*
Priority queues. 2 options.
  1) set the priority and add the element at the correct position
  2) queue the elements as they are added to the queue and remove them according to priority
*/

//example of first method of adding elements at correct position.
function PriorityQueue() {
  let items = []; //holds an array of objects, each with element and priority props

  //constructor to create objects to enter queue, {element: element, priority: priority}
  function QueueElement (element, priority){
    this.element = element;
    this.priority = priority;
  }

  this.enqueue = function(element, priority){
    let queueElement = new QueueElement(element, priority);

    let added = false;
    for (let i=0; i<items.length; i++){
      //compare priority of new object vs existing objects in queue
      if(queueElement.priority < items[i].priority) {
        items.splice(i,0,queueElement); //insert the object
        added = true;
        break; //no need to continue traversal if object added to queue
      }
    }
    if (!added){ //object didn't have priority, so add to end of queue
      items.push(queueElement);
    }
  };

  this.print = function(){
    for (let i=0; i<items.length; i++){
      console.log(`${items[i].element}: ${items[i].priority}`);
    }
  };
  //other methods - same as default Queue implementation
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();
//logs Jack: 1, Camila: 1, John: 2

/*
Circular queues, simulates the hot potato game. People randomly leave the queue until there is 1 left. Can build off the basic Queue class
*/

function hotPotato(nameList, num) {
  let queue = new Queue(); //can leverage basic queue class from earlier

  for (let i=0; i<nameList.length; i++){
    queue.enqueue(nameList[i]); //queue up everyone on the nameList array
  }

  let eliminated = '';
  while(queue.size() > 1) {
    for(let i=0; i<num; i++) {
      queue.enqueue(queue.dequeue()); //reorder of queue based on num
    }
    eliminated = queue.dequeue(); //remove people from queue
    console.log(eliminated + ' was eliminated from the Hot Potato  game.');
  }

  return queue.dequeue(); //return the remaining name and empty the queue
}

let names = ['John','Jack','Camila','Ingrid','Carl'];
let winner = hotPotato(names, 7);
console.log('The winner is: ' + winner); //logs 'The winner is: John'
