/*
Bitwise operators
Bit operators work on 32 bits numbers. Any numeric operand in the operation is converted into a 32 bit number. The result is converted back to a JavaScript number.

Summary:
& = AND, both bits are ones
| = OR, either or both bits are ones
~ = NOT, inverts the bit
^ = XOR, either bit is one, but not both
<< = Left shift, shifts in zeros from the right
>> = Right shift, shifts bits to the right discarding bits shifted off (from left, shifts in 0s if positive, 1s if negative)
>>> = zero-fill right shift, same as right shift but always shifts in zeros from the left regardless if number is positive or negative

Examples:
  *** & = AND, both bits are ones ***
    e.g. (9 & 14) => 8
         9 (base 10) = 00000000000000000000000000001001 (base 2)
        14 (base 10) = 00000000000000000000000000001110 (base 2)
    14 & 9 (base 10) = 00000000000000000000000000001000 (base 2) = 8 (base 10)
    simplified:
       9: 1001
      14: 1110
       => 1000 => 8

  *** | = OR, either or both bits are ones ***
    e.g. (9 & 14) => 15
         9 (base 10) = 00000000000000000000000000001001 (base 2)
        14 (base 10) = 00000000000000000000000000001110 (base 2)
    14 & 9 (base 10) = 00000000000000000000000000001111 (base 2) = 15 (base 10)

    Bitwise ORing any number x with 0 yields x. Bitwise ORing any number x with -1 yields -1 (since -1 is all 1s).

  *** ~ = NOT, inverts the bits ***
     9 (base 10) = 00000000000000000000000000001001 (base 2)
    ~9 (base 10) = 11111111111111111111111111110110 (base 2) = -10 (base 10)

    Bitwise NOTing any number x yields -(x + 1). For example, ~5 yields -6.

  *** ^ = XOR, either bit is one, but not both ***
        9 (base 10) = 00000000000000000000000000001001 (base 2)
       14 (base 10) = 00000000000000000000000000001110 (base 2)
   14 ^ 9 (base 10) = 00000000000000000000000000000111 (base 2) = 7 (base 10)

  *** << = Left shift, shifts in zeros from the right ***
         9 (base 10): 00000000000000000000000000001001 (base 2)
    9 << 2 (base 10): 00000000000000000000000000100100 (base 2) = 36 (base 10)

    Bitwise shifting any number x to the left by y bits yields x * 2^y.

  *** >> = Right shift, shifts bits to the right discarding bits shifted off (shifts in 0's on left if positive, 1's on left if negative) ***
         9 (base 10): 00000000000000000000000000001001 (base 2) (moves 2 places right)
    9 >> 2 (base 10): 00000000000000000000000000000010 (base 2) = 2 (base 10)

          -9 (base 10): 11111111111111111111111111110111 (base 2)
     -9 >> 2 (base 10): 11111111111111111111111111111101 (base 2) = -3 (base 10)

  *** >>> = zero-fill right shift, same as right shift but always shifts in zeros from the left making the result positive ***
          9 (base 10): 00000000000000000000000000001001 (base 2) (moves 2 places right)
    9 >>> 2 (base 10): 00000000000000000000000000000010 (base 2) = 2 (base 10)

          -9 (base 10): 11111111111111111111111111110111 (base 2)
    -9 >>> 2 (base 10): 00111111111111111111111111111101 (base 2) = 1073741821 (base 10), note how result becomes positive

  *** Complements ***
     314 is 00000000000000000000000100111010
    ~314 is 11111111111111111111111011000101, each bit inverted, same as -315
    -314 is 11111111111111111111111011000110, 2's complement of 314 where 1 is added to the inverted 314 (same as -315 + 1)

  The two's complement guarantees that the left-most bit is 0 when the number is positive and 1 when the number is negative. Thus, it is called the sign bit.
    -2147483648 (base 10) = 10000000000000000000000000000000 (base 2)
     2147483647 (base 10) = 01111111111111111111111111111111 (base 2)

  *** Bitmasks ***
  A bitmask is a sequence of bits that can manipulate and/or read flags. Typically, a "primitive" bitmask for each flag is defined:
    var FLAG_A = 1; // 0001
    var FLAG_B = 2; // 0010
    var FLAG_C = 4; // 0100
    var FLAG_D = 8; // 1000

    creating new Bitmasks, can run bitwise operators on the flags, e.g. use of OR, |
      var mask = FLAG_A | FLAG_B | FLAG_D; // 0001 | 0010 | 1000 => 1011


  *** Convert binary string to decimal number ***
    e.g. var decNumber = parseInt("1011", 2); => 11

  *** Convert decimal number to binary string ***
    var nMyNumber = 11;
    var sBinString = nMyNumber.toString(2); => "1011"
*/

/*
ES6 changes
*** let ***
  let, for declaring variables with block scope, replaces var. The scope of a var variable is the entire closing function, whereas the scope for let is the block in which it's defined and contained sub-blocks.

      function varTest() {
        var x = 1;
        if (true) {
          var x = 2;  // same variable!
          console.log(x);  // 2
        }
        console.log(x);  // 2
      }

      function letTest() {
        let x = 1;
        if (true) {
          let x = 2;  // different variable in different block scope
          console.log(x);  // 2
        }
        console.log(x);  // 1
      }

  with loops, an instance of i is created each time with let.
    var list = document.getElementById("list");

    for (let i = 1; i <= 5; i++) {
      let item = document.createElement("li");
      item.appendChild(document.createTextNode("Item " + i));

      item.onclick = function (ev) {
        console.log("Item " + i + " is clicked.");
      };
      list.appendChild(item);
    }

    five instances of the (anonymous) inner function refer to five different instances of the variable i. Note that it does not work as intended if you replace let with var, since all of the inner functions would then return the same final value of i: 6.

  'let' variables declared globally do not become properties of the global object unlike var.
    var x = 'global';
    let y = 'global';
    console.log(this.x); // "global"
    console.log(this.y); // undefined

  cannot declare multiple let variables of the same name in the same block scope, will encounter an error
    if (x) {
      let foo;
      let foo; // SyntaxError thrown.
    }

  cannot reference let variables before they're declared (unlike variables declared with var bc of hoisting)
    function do_something() {
      console.log(foo); // ReferenceError
      let foo = 2;
    }

*** Constants ***
  constants, declared with const, are block-scoped much like variables defined using the let statement. The value of a constant cannot change through re-assignment, and it can't be redeclared within the same block scope.

  objects and arrays declared with const can have their elements/keys mutated, but the variable cannot be reassigned to another object/array.

  Constants can be declared with uppercase or lowercase, but a common convention is to use all-uppercase letters.

    // define MY_FAV as a constant and give it the value 7
    const MY_FAV = 7;

    // this will throw an error in Firefox and Chrome (but does not fail in Safari)
    MY_FAV = 20;

    // will still print 7
    console.log("my favorite number is: " + MY_FAV);

    // trying to redeclare a constant throws an error
    const MY_FAV = 20;

    // the name MY_FAV is reserved for constant above, so this will also fail
    var MY_FAV = 20;

    // this throws an error also
    let MY_FAV = 20;

    // it's important to note the nature of block scoping
    if (MY_FAV === 7) {
        // this is fine and creates a block scoped MY_FAV variable
        // (works equally well with let to declare a block scoped non const variable)
        const MY_FAV = 20;

        // MY_FAV is now 20
        console.log("my favorite number is " + MY_FAV);

        // this gets hoisted into the global context and throws an error
        var MY_FAV = 20;
    }

    // MY_FAV is still 7
    console.log("my favorite number is " + MY_FAV);

    // Assigning to A const variable is a syntax error
    const A = 1; A = 2;

    // throws an error, missing initializer in const declaration
    const FOO;

    // const also works on objects
    const MY_OBJECT = {"key": "value"};

    // Overwriting the object behaves as above (throws an error in Firefox and Chrome but does not fail in Safari)
    MY_OBJECT = {"OTHER_KEY": "value"};

    // However, object keys are not protected,
    // so the following statement is executed without problem
    MY_OBJECT.key = "otherValue"; // Use Object.freeze() to make object immutable

    // The same applies to arrays
    const MY_ARRAY = [];
    // It's possible to push items into the array
    MY_ARRAY.push("A"); // ["A"]
    // However, assigning a new array to the variable throws an error in Firefox and Chrome but does not fail in Safari
    MY_ARRAY = ["B"]

*** Template Literals ***
  Can create strings without concatenating their values by using ${varName}. Also don't need to use \n to create new lines.
    es5:
      var book = {
        name: 'some book'
      };
      console.log('You are reading ' + book.name + '.,\n    and this is a new line\n    and so is this.');

    es6:
      console.log(`You are reading ${book.name}.,
      and this is a new line
      and so is this.`);

*** Arrow Functions ***
  Can declare functions with () => {} instead of function optionalName() {}.

  if function has a single statement, don't need keyword return, must also omit {} around function body for it to work

    let double = (a) => a+a; //double(2) returns 4, must omit {} around a+a

  An arrow function does not create its own this context (unlike functions declared with 'function'), so 'this' has the original meaning from the enclosing context. Thus the following code works as expected.

    function Person(){
      this.age = 0;

      setInterval(() => {
        this.age++; // this properly refers to the person object
      }, 1000);
    }

    var p = new Person();

  Since arrow functions do not create their own 'this' context, arrow functions that reference 'this' and are called with call or apply do not reset 'this'/context, they only use arguments to invoke the function.
      var adder = {
        base : 1,

        add : function(a) {
          var f = v => v + this.base;
          return f(a);
        },

        addThruCall: function(a) {
          var f = v => v + this.base;
          var b = {
            base : 2
          };

          return f.call(b, a);
        }
      };

      console.log(adder.add(1));         // This would log to 2
      console.log(adder.addThruCall(1)); // This would log to 2 still

  Arrow functions do not bind an 'arguments' object or have their own arguments object, arguments simply refers to whatever is in the outer enclosing scope. However, can use rest parameters as a good alternative
      function foo() {
        var f = (...args) => args[0];
        return f(2);
      }

      foo(1); // 2

  Arrow function expressions are best suited for non-method functions. When used as methods that reference 'this', this is ignored.
      var obj = {
        i: 10,
        b: () => console.log(this.i, this),
        c: function() {
          console.log( this.i, this)
        }
      }
      obj.b(); // prints undefined, Window
      obj.c(); // prints 10, Object {...}

  Arrow functions cannot be used as constructors and will throw an error when used with new.

  More Examples of arrow functions
      // An empty arrow function returns undefined
      let empty = () => {};

      (() => "foobar")() // IIFE, returns "foobar"

      var simple = a => a > 15 ? 15 : a;
      simple(16); // 15
      simple(10); // 10

      let max = (a, b) => a > b ? a : b;

      // Easy array filtering, mapping, ...

      var arr = [5, 6, 13, 0, 1, 18, 23];
      var sum = arr.reduce((a, b) => a + b);  // 66
      var even = arr.filter(v => v % 2 == 0); // [6, 0, 18]
      var double = arr.map(v => v * 2);       // [10, 12, 26, 0, 2, 36, 46]

      // More concise promise chains
      promise.then(a => {
        // ...
      }).then(b => {
         // ...
      });

*** Default parameters ***
  Possible to define default parameter values for functions. Without default values parameters normally default to undefined.
      function sum(x = 1, y = 2, z = 3) {
        return x + y + z;
      }
      console.log( sum(4,2) ); // logs 9, we didn't pass a 3rd arg for z

  default parameters are also available to other default parameters in the same function
      function singularAutoPlural(singular, plural = singular+"s",
                                  rallyingCry = plural + " ATTACK!!!") {
        return [singular, plural, rallyingCry ];
      }

      singularAutoPlural("Gecko");
      //["Gecko","Geckos", "Geckos ATTACK!!!"]

*** Spread and rest operators ***
  spread elements 'expands' an array into its elements, spread operators take the place of multiple arguments in a function or multiple elements in an array
    let someVar = [1,2,3];
    someFunction(...someVar);
    [..someVar, 4,5,6]

  Can replace the use of apply to use array elements as arguments
    using apply:
      function myFunction(x, y, z) { }
      var args = [0, 1, 2];
      myFunction.apply(null, args);

    using spread operator:
      function myFunction(x, y, z) { }
      var args = [0, 1, 2];
      myFunction(...args);

  Can be used to reference a whole array or just certain elements
    function myFunction(v, w, x, y, z) { }
    var args = [0, 1];
    myFunction(-1, ...args, 2, ...[3]); // same as myFunction(-1,0,1,2,3)

  Can use to add elements to array Literals
    var parts = ['shoulders', 'knees'];
    var lyrics = ['head', ...parts, 'and', 'toes'];
    // ["head", "shoulders", "knees", "and", "toes"]

  Can copy an array, typically goes 1-level deep
    var arr = [1,2,3];
    var arr2 = [...arr]; // like arr.slice()
    arr2.push(4); // arr2 becomes [1,2,3,4], arr stays unaffected

    however doesn't work well with multidimensional arrays (same effect applies to slice also to copy arrays)
      var a = [[1], [2], [3]];
      var b = [...a];
      b.shift().shift();// a is now [[], [2], [3]]

  Alternative to concat and push
    concat:
      var arr1 = [0, 1, 2];
      var arr2 = [3, 4, 5];
      // Append all items from arr2 onto arr1
      arr1 = arr1.concat(arr2); //arr1 now [0,1,2,3,4,5]
        if you only had arr1.concat(arr2), arr1 would still be [0,1,2], need to assign arr1 to the result of the concatenation

    push:
      var arr1 = [0, 1, 2];
      var arr2 = [3, 4, 5];
      // Append all items from arr2 onto arr1
      Array.prototype.push.apply(arr1, arr2); //arr1 now [0,1,2,3,4,5]

    using spread operator:
      var arr1 = [0, 1, 2];
      var arr2 = [3, 4, 5];
      arr1.push(...arr2); //arr1 now [0,1,2,3,4,5]

    rest operator, can think of it as the 'rest of the arguments' of a function placed in an array. must be used at the END of the parameter list or be the only parameter.
        function fun1(...theArgs) { //spread used here
          //below, theArgs is an array, '...' isn't used, rest used here
          console.log(theArgs.length);
          console.log(theArgs); //logs an array literal
          console.log(...theArgs); //spread operator, logs the elements
        }

        fun1();  // logs 0, [], blank
        fun1(5); // logs 1, [5], 5
        fun1(5, 6, 7); // logs 3, [5,6,7], 5 6 7

    if other parameters are defined, rest operator only represents the other arguments
        function fun2(x, ...args) {
          console.log(args);
          console.log(x);
          console.log(...args);
        }
        fun2(1, 2, 3); //args is [2,3], x is 1, ...args is 2 3

*** Destructuring assignment ***
  an expression that can extract data from arrays or objects into distinct variables
      var a, b, rest;
      [a, b] = [1, 2];
      console.log(a); // 1
      console.log(b); // 2

      [a, b, ...rest] = [1, 2, 3, 4, 5];
      console.log(a); // 1
      console.log(b); // 2
      console.log(rest); // [3, 4, 5]

      ({a, b} = {a:1, b:2}); //var names must match prop names, need () to wrap expression or else left side treated as block instead of object
      console.log(a); // 1
      console.log(b); // 2

      var o = {p: 42, q: true};
      var {p, q} = o; //don't need to wrap with () when declaring vars
      console.log(p); // 42
      console.log(q); // true

  use the left-hand side of the assignment to define what elements to extract from the sourced variable
      var x = [1, 2, 3, 4, 5];
      var [y, z] = x; // extracting from array literal x
      console.log(y); // 1
      console.log(z); // 2

  can assign default values in case the value extracted is undefined
      e.g. with array
      var [a=1, b=5] = [2]; // a = 2, b = 5 still

      e.g. with objects
      //props of obj literal have default vals, obj literal has default val
      function drawES6Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) {
        console.log(size, cords, radius);
        // do some chart drawing
      }
      drawES6Chart({
        cords: { x: 18, y: 30 },
        radius: 30
        //size is still 'big', but values for cords and radius change for this execution context
      });

  can swap values in a destructuring assignment, which would normally require a temp variable (e.g. in sorting algorithms)
    old way:
      var a = 1;
      var b = 2;

      var temp = a; //temp copy of a created
      a = b; //a now is 2
      b = temp; //b now is 1

    destructuring way:
      var [a, b] = [1, 3]; //a = 1, b = 3
      [a, b] = [b, a]; //a = 3, b = 1

  can extract variables from objects and reassign them values from other objects
      var o = {p: 42, q: true};
      var {p: foo, q: bar} = o; //values of object literal become vars, but their props must still match props from right-hand side

      console.log(foo); // 42
      console.log(bar); // true

  can destructure with nested objects and arrays
      var metadata = {
          title: "Scratchpad",
          translations: [
             {
              locale: "de",
              localization_tags: [ ],
              last_edit: "2014-04-14T08:43:37",
              url: "/de/docs/Tools/Scratchpad",
              title: "JavaScript-Umgebung"
             }
          ],
          url: "/en-US/docs/Tools/Scratchpad"
      };

      var { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;

      console.log(englishTitle); // "Scratchpad"
      console.log(localeTitle);  // "JavaScript-Umgebung"

  can destructure with 'for of' iterations
      var people = [
        {
          name: "Mike Smith",
          family: {
            mother: "Jane Smith",
            father: "Harry Smith",
            sister: "Samantha Smith"
          },
          age: 35
        },
        {
          name: "Tom Jones",
          family: {
            mother: "Norah Jones",
            father: "Richard Jones",
            brother: "Howard Jones"
          },
          age: 25
        }
      ];

      for (var {name: n, family: { father: f } } of people) {
        console.log("Name: " + n + ", Father: " + f);
        //n becomes variable, looks for value in people whose prop is name
        //f becomes variable, looks for value in people whose prop is father
      }

      // "Name: Mike Smith, Father: Harry Smith"
      // "Name: Tom Jones, Father: Richard Jones"

  can destructure via pulling fields from objects passed as function parameters
    // pulls the id, displayName and firstName from the user object and prints them.
      function userId({id}) { //destructure val of id from object passed in
        return id;
      }

      //destructure vals of displayName and firstName from object passed in
      function whois({displayName: displayName, fullName: {firstName: name}}){
        console.log(displayName + " is " + name);
      }

      var user = {
        id: 42,
        displayName: "jdoe",
        fullName: {
            firstName: "John",
            lastName: "Doe"
        }
      };

      console.log("userId: " + userId(user)); // "userId: 42"
      whois(user); // "jdoe is John"

*** Object-oriented programming with classes ***
  es6 classes in JS are syntactic sugar, JS still uses prototypal inheritance. class declarations are not hoisted, so declare the class before you create instances of it.
    old way:
        function Book(title, pages, isbn){ //{1}
          this.title = title;
          this.pages = pages;
          this.isbn = isbn;
        }
        Book.prototype.printTitle = function(){
          console.log(this.title);
        };

    es6 way:
        class Book { //{2}
          constructor (title, pages, isbn) {
            this.title = title;
            this.pages = pages;
            this.isbn = isbn;
          }
          printIsbn(){
            console.log(this.isbn);
          }
        }

        //constructor method special for creating and initializing an object within a class

  would still create an instance via keyboard 'new':
    let book = new Book('title', 10, 'd87');

  can also define classes via expressions
      // unnamed class
      var Polygon = class {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }
      };

      // named class
      var Polygon = class Polygon {
        constructor(height, width) {
          this.height = height;
          this.width = width;
        }
      };

  also a simplified way to use inheritance between classes
      class ITBook extends Book {   //ITBook inherits from Book
        constructor (title, pages, isbn, technology) {
          super(title, pages, isbn);  //args come from superclass Book
          this.technology = technology;   //technology unique to ITBook
        }
        printTechnology(){  //method unique to ITBook
          console.log(this.technology);
        }
      }

      let jsBook = new ITBook('sample title', '200', '1234567890', 'JS');
      console.log(jsBook.title); //logs 'sample title'
      console.log(jsBook.printTechnology()); //logs 'JS'

      another example:
          class Cat {
            constructor(name) {
              this.name = name;
            }

            speak() {
              console.log(this.name + ' makes a noise.');
            }
          }

          class Lion extends Cat {
            speak() {
              super.speak();
              console.log(this.name + ' roars.');
            }
          }

          var dj = new Lion('DJ');
          dj.speak(); //DJ makes a noise. //DJ roars. didn't need to ref constructor in Lion subclass since we only added a method.

  can create getter and setter functions for classes
      class Person {
        constructor (name) {
          this._name = name; //need _name instead of just name if using get and set
        }
        get name() {
          return this._name; //need _ for name
        }
        set name(value) {
          this._name = value; //need _ for name
        }
      }

      let lotrChar = new Person('Frodo');
      console.log(lotrChar.name); //logs 'Frodo'
      lotrChar.name = 'Gandalf';
      console.log(lotrChar.name); //logs 'Gandalf'
      lotrChar._name = 'Sam'; //_ is optional
      console.log(lotrChar.name); //logs 'Sam'

    static methods used to create utility functions, they're called as a method of the class function, not on the instance, and are NOT callable on an instance.
        class Point {
          constructor(x, y) {
              this.x = x;
              this.y = y;
          }

          static distance(a, b) {
              const dx = a.x - b.x;
              const dy = a.y - b.y;

              return Math.sqrt(dx*dx + dy*dy);
          }
        }

        const p1 = new Point(5, 5);
        const p2 = new Point(10, 10);

        //note how the static method is invoked, pass in 2 instances
        console.log(Point.distance(p1, p2));

    can extend traditional function-based classes, remember using 'class' is just syntactic sugar!
        //traditional pseudoclassical constructor function
        function Animal (name) {
          this.name = name;
        }
        Animal.prototype.speak = function () {
          console.log(this.name + ' makes a noise.');
        }

        //Animal is superclass to subclass Dog
        class Dog extends Animal {
          speak() {
            super.speak();
          console.log(this.name + ' barks.');
          }
        }

        var d = new Dog('Mitzie');
        d.speak(); //Mitzie makes a noise. //Mitzie barks.
*/
