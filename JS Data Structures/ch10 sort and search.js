//bubble sort
  //max value 'bubbles up' to end of array, then process repeats until array is sorted
function bubbleSort(array) {
  for(var i = 0; i < array.length; i++) {
    for(var j = 0; j < array.length - 1; j++) {
      if(array[j] > array[j+1]) {
        [array[j], array[j+1]] = [array[j+1], array[j]];
      }
    }
  }
  return array;
}

//slightly improved bubble sort
  //avoids comparing numbers that are already in place via '- i' in 2nd for loop
  //however still has O(N^2) complexity
function bubbleSort(array) {
  for(var i = 0; i < array.length; i++) {
    for(var j = 0; j < array.length-1-i; j++) { //only difference is here
      if(array[j] > array[j+1]) {
        [array[j], array[j+1]] = [array[j+1], array[j]];
      }
    }
  }
  return array;
}

//selection sort
  //find the index with the minimal value, compare it to value at i, if minIndex !== i, swap them
  //basically find min val, put at 0, then 2nd min val, put at 1, then 3rd min val, put at 2, etc.
  //complexity is O(N^2)
function selectionSort(array) {
  for(var i = 0; i < array.length-1; i++) {
  	var minIndex = i;
    for(var j = i; j < array.length; j++) {
      if(array[minIndex] > array[j]) {
        minIndex = j;
      }
    }
    if(i !== minIndex) {
			[array[minIndex], array[i]] = [array[i], array[minIndex]];
    }
  }
  return array;
}

//insertion sort
  //assumes 1st element is sorted, which is why we start at i=1 (array doesn't have to actually be sorted at i=1)
  //better performance than the selection and bubble sort algorithms when sorting small arrays
function insertionSort(array) {
  for(var i = 1; i < array.length-1; i++) {
		var j = i; //save copy of i that we can change
		var current = array[i]; //save copy of current val at i
		while (j>0 && array[j-1] > current) { //see if previous val is > current val
      array[j] = array[j-1]; //move value at j-1 up one spot at j
      j--;
    }
    array[j] = current;
    console.log(array);
  }
  return array;
}

//merge sort
  //complexity O(n log n)
  //firefox uses merge sort for its implementation of Array.prototype.sort
  //divide original array into smaller arrays until each small array only has 1 position, then merge them back as sorted
  //merge doesn't happen until there's 1 element in each array from mergeSort
var merge = function(left, right) { //helper function for mergeSort
  var result = [],
      il = 0,
      ir = 0;

  while(il < left.length && ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++]);
    } else{
      result.push(right[ir++]);
    }
  }
  while (il < left.length) { //push remaining items in left if they exist
    result.push(left[il++]);
  }
  while (ir < right.length) { //push remaining items in right if they exist
    result.push(right[ir++]);
  }
  console.log(result);
  return result;
};

var mergeSort = function(array) {
  var length = array.length;
  //base case to return array
  if (length === 1) {
	  console.log(array);
	  return array;
  }

  var mid = Math.floor(length / 2),
      left = array.slice(0, mid),
      right = array.slice(mid, length);

  return merge(mergeSort(left), mergeSort(right)); //break down array then reassemble sorted
};

//quick sort
  //chrome uses a variation of quick sort for its implementation of Array.prototype.sort
  //also n log n, very commonly used sorting algorithm
var quickSort = function(array) {
  quick(array, 0, array.length - 1);
};
//helper function for quickSort
var partition = function(array, left, right) {
  var pivot = array[Math.floor((right + left) / 2)]; //select the middle item as the pivot
  var i = left; //left pointer, 1st starts at 0
  var j = right; //right pointer, 1st starts at array.length-1

  console.log('pivot is ' + pivot + '; left is ' + left + '; right is ' + right);

  while (i <= j) { //condition where i and j haven't crossed each other
    while (array[i] < pivot) { //items at i should be less than val at pivot. stop shifting i until val at i > pivot.
      i++;
      console.log('i = ' + i);
    }
    while (array[j] > pivot) { //items at j should be greater than val at pivot. stop shifting j until val at j < pivot
      j--;
      console.log('j = ' + j);
    }
    if (i <= j) { //if i <= j, see values at i and j, then shift vals for i and j
      console.log('swap ' + array[i] + ' with ' + array[j]);
      [array[i], array[j]] = [array[j], array[i]];
      i++;
      j--;
    }
  }
  return i; //return left pointer, will be used to create subarrays in quick helper function
};
//helper function for quickSort
var quick = function(array, left, right) {
  var index; //index helps us separate the subarray with smaller and greater values so that we can recursively call the quick function again

  if (array.length > 1) { //array with 1 element is already sorted, need to sort when > 1 element
    index = partition(array, left, right); //index assigned to returned value of partition function
    if (left < index - 1) {
      quick(array, left, index - 1);
    }
    if (index < right) {
      quick(array, index, right);
    }
  }
  return array;
};

// variation of quicksort, no helper functions needed
function quickSort(arr) {

  if(arr.length === 0) {
    return [];
  }

  let pivot = arr[0];
  let small = [];
  let big = [];

  for(var i = 1; i < arr.length; i++) {
    if(arr[i] < pivot) {
      small.push(arr[i]);
    } else {
      big.push(arr[i]);
    }
  }

  return [...quickSort(small), pivot, ...quickSort(big)];
}

//heap sort
  //another efficient sorting algorithm, sorts an array as if it were a binary tree
  //index 0 is root of tree
  //The parent of any node N is N/2 (with the exception of the root node)
  //The left-hand side child of a node L is 2*L
  //The right-hand child of a node R is 2*R+1
var heapSort = function(array) {
  var heapSize = array.length;
  buildHeap(array); //makes sure parent nodes are always > child nodes

  while (heapSize > 1) {
    heapSize--;
    [array[0], array[heapSize]] = [array[heapSize], array[0]];
    heapify(array, heapSize, 0);
  }
  return array;
};

var buildHeap = function(array) {
  var heapSize = array.length;
  for(var i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, heapSize, i);
  }
};

var heapify = function(array, heapSize, i){
  var left = i * 2 + 1;
  var right = i * 2 + 2;
  var largest = i;

  if (left < heapSize && array[left] > array[largest]) {
    largest = left;
  }

  if (right < heapSize && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    heapify(array, heapSize, largest);
  }
};

//Distribution sorts
  //they are counting sort, bucket sort, radix sort

  //Counting sort
  var countingSort = function(array) {
    var i,
        maxValue = findMaxValue(array),
        sortedIndex = 0,
        counts = new Array(maxValue + 1);

    for (i = 0; i < array.length; i++) {
      if (!counts[array[i]]) {
        counts[array[i]] = 0;
      }
      counts[array[i]]++;
    }

    console.log('Frequencies: ' + counts.join());

    for (i = 0; i < counts.length; i++) {
      while (counts[i] > 0) {
        array[sortedIndex++] = i;
        counts[i]--;
      }
    }
    return array;
  };
  //helper function
  var findMaxValue = function(array){
    var max = array[0];
    for (var i=1; i<array.length; i++){
      if (max < array[i]){
        max = array[i];
      }
    }
    return max;
  };
  //helper function
  var findMinValue = function(array){
    var min = array[0];
    for (var i=1; i<array.length; i++){
      if (min > array[i]){
        min = array[i];
      }
    }
    return min;
  };

  //Bucket sort
  var bucketSort = function(array, bucketSize) {
  var i,
      minValue = findMinValue(array),
      maxValue = findMaxValue(array),
      BUCKET_SIZE = 5;

  console.log('minValue ' + minValue);
  console.log('maxValue ' + maxValue);

  bucketSize = bucketSize || BUCKET_SIZE;
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  var buckets = new Array(bucketCount);
  console.log('bucketSize = ' + bucketCount);
  for (i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }

  for (i = 0; i < array.length; i++) {
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
    console.log('pushing item ' + array[i] + ' to bucket index ' + Math.floor((array[i] - minValue) / bucketSize));
  }

  array = [];
  for (i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]);
    console.log('bucket sorted ' + i + ': ' + buckets[i].join());
    for (var j = 0; j < buckets[i].length; j++) {
      array.push(buckets[i][j]);
    }
  }
  return array;
};

  //Radix sort
var radixSort = function(array, radixBase=10){
  var i,
      minValue = findMinValue(array),
      maxValue = findMaxValue(array);

  // Perform counting sort for each significant digit), starting at 1
  var significantDigit = 1;
  while (((maxValue - minValue) / significantDigit) >= 1) {
	  console.log('radix sort for digit ' + significantDigit);
	  array = countingSortForRadix(array, radixBase, significantDigit, minValue);
	  console.log(array.join());
	  significantDigit *= radixBase;
  }
  return array;
};

//helper function for radixSort
var countingSortForRadix = function(array, radixBase, significantDigit, minValue){
  var i, countsIndex,
      counts = new Array(radixBase),
      aux = new Array(radixBase);
  for (i = 0; i < radixBase; i++) {
    counts[i] = 0;
  }
  for (i = 0; i < array.length; i++) {
    countsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    counts[countsIndex]++;
  }
  for (i = 1; i < radixBase; i++) {
    counts[i] += counts[i - 1];
  }
  for (i = array.length - 1; i >= 0; i--) {
    countsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    aux[--counts[countsIndex]] = array[i];
  }
  for (i = 0; i < array.length; i++) {
    array[i] = aux[i];
  }
  return array;
};

//sequential search
  //most basic but inefficient algorithm
  //still works if array isn't sorted
var sequentialSearch = function(array, item){
  for (var i=0; i<array.length; i++){
    if (item === array[i]){
      return i;
    }
  }
  return -1;
};

//binary search
  //faster than sequential search, but only works if array is sorted
  var binarySearch = function(array, target){
    array = quickSort(array);

    var low = 0;
    var high = array.length - 1;
    var mid;
    var itemAtMid;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      itemAtMid = array[mid];
      if (itemAtMid < target) {
        low = mid + 1;
      } else if (itemAtMid > target) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  };
