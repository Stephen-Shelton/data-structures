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



*/
