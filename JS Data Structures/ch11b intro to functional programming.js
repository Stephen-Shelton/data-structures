/*
- We've been using a paradigm called imperative programming. In imperative programming, we code each step of the program, describing in detail what needs to be done and in which order it needs to be done.
- Functional programming was a paradigm used especially by academics, and thanks to modern languages such as Python and Ruby, it started becoming popular among industry developers as well.
- we can use JavaScript to program functionally, leveraging its ES6 capabilities

- The order of the execution of the program has low importance, while the steps and their order are very important in imperative programming
- Functions and data collections are the rockstars in functional programming
- We can use and abuse functions and recursion in functional programming, while the loops, assignments, conditionals, and also functions are used in imperative programming
*/

//functional vs imperative, e.g. printing an array
//imperative:
var printArray = function(array){
  for (var i=0; i<array.length; i++){
    console.log(array[i]);
  }
};
printArray([1, 2, 3, 4, 5]);

//functional (functions are key!):
var forEach = function(array, action){
  for (var i=0; i<array.length; i++){
    action(array[i]);
  }
};

var logItem = function (item) {
  console.log(item);
};

forEach([1, 2, 3, 4, 5], logItem);

/*
ES6 / ES2015 makes developing functional programs in JS easier.
*/
//e.g. imperative way to find min value in array
var findMinArray = function(array){
  var minValue = array[0];
  for (var i=1; i<array.length; i++){
    if (minValue > array[i]){
      minValue = array[i];
    }
  }
  return minValue;
};
console.log(findMinArray([8,6,4,5,9])); //outputs 4

//functional way to find min value in array
const min_ = function(array){
  return Math.min(...array);
};
console.log(min_([8,6,4,5,9])); //outputs 4

//using arrow functions
const min = arr => Math.min(...arr);
console.log(min([8,6,4,5,9]));

/*
Map, filter, and reduce heavily used for functional programming in JS
  - map transforms a collection of data into another collection of data
  - filter can filter out items from a collection
  - reduce can reduce a collection to a specific value
*/

//imperative use of Map
var daysOfWeek = [
  {name: 'Monday', value: 1},
  {name: 'Tuesday', value: 2},
  {name: 'Wednesday', value: 7}
];

var daysOfWeekValues_ = [];
for (var i = 0; i < daysOfWeek.length; i++) {
  daysOfWeekValues_.push(daysOfWeek[i].value);
}

//functional use of Map
var daysOfWeekValues = daysOfWeek.map(function(day) {
  return day.value;
});
console.log(daysOfWeekValues);

//imperative use to filter
var positiveNumbers_ = function(array){
  var positive = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] >= 0){
      positive.push(array[i]);
    }
  }
  return positive;
};
console.log(positiveNumbers_([-1,1,2,-2]));

//functional use of filter native method
var positiveNumbers = function(array){
  return array.filter(function(num){
    return num >= 0;
  });
};
console.log(positiveNumbers([-1,1,2,-2]));

//imperative use of reducing values
var sumValues = function(array){
  var total = array[0];
  for (var i=1; i<array.length; i++){
    total += array[i];
  }
  return total;
};
console.log(sumValues([1, 2, 3, 4, 5]));

//functional use of reduce
var sum_ = function(array){
  return array.reduce(function(a, b){
    return a + b;
  });
};
console.log(sum_([1, 2, 3, 4, 5]));

//using destructuring and arrow functions
const sum = arr => arr.reduce((a, b) => a + b);
console.log(sum([1, 2, 3, 4, 5]));

//imperative function to concat arrays
var mergeArrays_ = function(arrays){
  var count = arrays.length,
  newArray = [],
  k = 0;
  for (var i=0; i<count; i++){
    for (var j=0; j<arrays[i].length; j++){
      newArray[k++] = arrays[i][j];
    }
  }
  return newArray;
};
console.log(mergeArrays_([[1, 2, 3], [4, 5], [6]]));

//functional way to concat arrays
var mergeArraysConcat = function(arrays){
  return arrays.reduce(function(p,n){
    return p.concat(n);
  });
};
console.log(mergeArraysConcat([[1, 2, 3], [4, 5], [6]]));

//same functionality even shorter
const mergeArrays = (...arrays) => [].concat(...arrays);
console.log(mergeArrays([1, 2, 3], [4, 5], [6]));
