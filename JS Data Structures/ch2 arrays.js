/*
*** Arrays ***

2d Arrays
  e.g. 3x3, can iterate via nested for loops
  [[1,2,3],
  [4,5,6],
  [7,8,9]]

3d Arrays
  e.g. 3 x 3 x 3, can iterate via 3 nested for loops
  [
    [
      [0],[1],[2]
    ],

    [
      [0],[1],[2]
    ],
    [
      [0],[1],[2]
    ]
  ]

*** es6/es7 array methods ***
  @@iterator - This returns an iterator object that contains the key/value pairs of the array that can be synchronously called to retrieve key/value of the array elements.

    every array has a Symbol.iterator property whose value is a function that returns an object with methods.
        var numbers = [1,2,3,4,5];
        let iterator = numbers[Symbol.iterator]();
        console.log(iterator.next().value); //1
        console.log(iterator.next().value); //2
        console.log(iterator.next().value); //3
        console.log(iterator.next().value); //4
        console.log(iterator.next().value); //5

    can also return an iterator via the .entries method, which retrieves index/value pairs in the form of arrays
        let aEntries = numbers.entries(); //retrieve iterator of key/value
        console.log(aEntries.next().value); //[0, 1] - position 0, value 1
        console.log(aEntries.next().value); //[1, 2] - position 1, value 2
        console.log(aEntries.next().value); //[2, 3] - position 2, value 3

    can also return an iterator via the .keys method, which retrieves keys/indices in the form of an object literal
        let aKeys = numbers.keys(); //retrieve iterator of keys
        console.log(aKeys.next()); // {value: 0, done: false }
        console.log(aKeys.next()); // {value: 1, done: false }
        console.log(aKeys.next()); // {value: 2, done: false }

    can also return an iterator via the .values method, which retrieves values of the array in the form of object Literals
        let aValues = numbers.values();
        console.log(aValues.next()); // {value: 1, done: false }
        console.log(aValues.next()); // {value: 2, done: false }
        console.log(aValues.next()); // {value: 3, done: false }

  includes - This returns true in case an element is found in the array, and false otherwise. This was added in ES 7.

    [1,2,3,4].includes(2); //true

  find - This searches for an element in the array given a desired condition (callback function) and returns the element in case it is found.

    [1,2,3,4].find((num) => {
      return num > 2; //returns 3, 1st val to satisfy condition
    })

  findIndex - This searches for an element in the array given a desired condition (callback function) and returns the element index in case it is found.

    [1,2,3,4].findIndex((num) => {
      return num > 2; //returns 2, 1st val to satisfy condition at index 2
    })

  for ... of loops, alternative to forEach or for loops
    var arr = [1,2,3,4];
    for(var n of arr) {
      console.log(n); //logs 1,2,3,4
    }

  fill method of arrays - fills array with values
    syntax: arr.fill(valToFill, startIndex, upUntilIndex)
      let arr = Array.of(0,2,2,2,2,2); //creates array [0,2,2,2,2,2];
      arr.fill(1,3,5); //at index 3 and 4, fill array with 1's. [0,2,2,1,1,2]

  copyWithin method - copies a sequence of values of an array into the position of a start index
    syntax: arr.copyWithin(pastAtIndex, startCopyAt, endCopyBefore)
      copyArray = [1, 2, 3, 4, 5, 6];
      copyArray.copyWithin(1, 3, 5);  //copy values at 3 and 4 at 1 and 2
      // => [1,4,5,4,5,6]

*** Sorting ***
reverse and sort array methods
  assume we have an arr [1 ... 15], arr.reverse() => [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].

  however if we then run arr.sort() we get an incorrect sort since the method sorts elements lexicographically and assumes elements are strings
    //[ 1, 10, 11, 12, 13, 14, 15, 2, 3, 4, 5, 6, 7, 8, 9 ] WRONG

  can use our own inner function with sort to sort properly
    arr.sort((a,b) => a-b); // [1 ... 15] sorted properly

  code is equivalent to:
    function compare(a,b) {
      if(b > a) {
        return -1;
      }
      if(b < a) {
        return 1;
      }
      return 0; //case if they're equal
    }
    arr.sort(compare);

    example with an object
      var friends = [
        {name: 'John', age: 30},
        {name: 'Ana', age: 20},
        {name: 'Chris', age: 25}
      ];

      function comparePerson(a, b){
        if (a.age < b.age){
          return -1
        }
        if (a.age > b.age){
          return 1
        }
          return 0;
      }

      console.log(friends.sort(comparePerson)); //order is Ana, Chris, John

    if you sort strings, it sorts by ASCII values, so capitalized letters come before lowercase letters. can get around case with your own function
        names.sort(function(a, b){
          if (a.toLowerCase() < b.toLowerCase()){
            return -1
          }
          if (a.toLowerCase() > b.toLowerCase()){
            return 1
          }
          return 0;
        });

    for accented characters can use localeCompare methods
        var names2 = ['Maève', 'Maeve'];
        console.log(names2.sort(function(a, b){
          return a.localeCompare(b);
        }));

*** Searching ***
Traditionally search with indexOf or lastIndexOf. Can use find, findIndex, and includes methods with es6/7.

find returns the value that matches the condition, findIndex returns the index of the value that matches the condition, and includes returns a boolean.

  can define a starting index to search for includes. below will return false since search starts at index 5.
      let numbers2 = [7,6,5,4,3,2,1];
      console.log(numbers2.includes(4, 5)); //returns false

*** Typed Arrays ***
Can use the TypeArray class to create arrays with a single datatype. Syntax is let myArray = new TypedArray(length);

Typed arrays are great to work with WebGL APIs, manipulate bits, and manipulate files and images

*/
