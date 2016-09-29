/*
Bitwise operators
Bit operators work on 32 bits numbers. Any numeric operand in the operation is converted into a 32 bit number. The result is converted back to a JavaScript number.

Summary:
& = AND, both bits are ones
| = OR, either or both bits are ones
~ = NOT, inverts the bit
^ = XOR, either bit is one, but not both
<< = Left shift, shifts in zeros from the right
>> = Right shift, shifts bits to the right discarding bits shifted off (does not shift in zeros from the left)
>>> = zero-fill right shift, same as right shift but also shifts in zeros from the left

Examples:
  & = AND, both bits are ones
    e.g. (9 & 14) => 8
         9 (base 10) = 00000000000000000000000000001001 (base 2)
        14 (base 10) = 00000000000000000000000000001110 (base 2)
    14 & 9 (base 10) = 00000000000000000000000000001000 (base 2) = 8 (base 10)
    simplified:
       9: 1001
      14: 1110
       => 1000 => 8

  | = OR, either or both bits are ones
    e.g. (9 & 14) => 15
         9 (base 10) = 00000000000000000000000000001001 (base 2)
        14 (base 10) = 00000000000000000000000000001110 (base 2)
    14 & 9 (base 10) = 00000000000000000000000000001111 (base 2) = 15 (base 10)

    Bitwise ORing any number x with 0 yields x. Bitwise ORing any number x with -1 yields -1.

  ~ = NOT, inverts the bit
     9 (base 10) = 00000000000000000000000000001001 (base 2)
    ~9 (base 10) = 11111111111111111111111111110110 (base 2) = -10 (base 10)

    Bitwise NOTing any number x yields -(x + 1). For example, ~5 yields -6.

  ^ = XOR, either bit is one, but not both
        9 (base 10) = 00000000000000000000000000001001 (base 2)
       14 (base 10) = 00000000000000000000000000001110 (base 2)
   14 ^ 9 (base 10) = 00000000000000000000000000000111 (base 2) = 7 (base 10)

  << = Left shift, shifts in zeros from the right
         9 (base 10): 00000000000000000000000000001001 (base 2)
    9 << 2 (base 10): 00000000000000000000000000100100 (base 2) = 36 (base 10)

    Bitwise shifting any number x to the left by y bits yields x * 2^y.

  >> = Right shift, shifts bits to the right discarding bits shifted off (shifts in 0's on left if positive, 1's on left if negative)
         9 (base 10): 00000000000000000000000000001001 (base 2) (moves 2 places right)
    9 >> 2 (base 10): 00000000000000000000000000000010 (base 2) = 2 (base 10)

          -9 (base 10): 11111111111111111111111111110111 (base 2)
     -9 >> 2 (base 10): 11111111111111111111111111111101 (base 2) = -3 (base 10)

  >>> = zero-fill right shift, same as right shift but always shifts in zeros from the left making the result positive
          9 (base 10): 00000000000000000000000000001001 (base 2) (moves 2 places right)
    9 >>> 2 (base 10): 00000000000000000000000000000010 (base 2) = 2 (base 10)

          -9 (base 10): 11111111111111111111111111110111 (base 2)
    -9 >>> 2 (base 10): 00111111111111111111111111111101 (base 2) = 1073741821 (base 10), note how result becomes positive

  Complements
     314 is 00000000000000000000000100111010
    ~314 is 11111111111111111111111011000101, each bit inverted, same as -315
    -314 is 11111111111111111111111011000110, 2's complement of 314 where 1 is added to the inverted 314 (same as -315 + 1)

  The two's complement guarantees that the left-most bit is 0 when the number is positive and 1 when the number is negative. Thus, it is called the sign bit.
    -2147483648 (base 10) = 10000000000000000000000000000000 (base 2)
     2147483647 (base 10) = 01111111111111111111111111111111 (base 2)

  Bitmasks
  A bitmask is a sequence of bits that can manipulate and/or read flags. Typically, a "primitive" bitmask for each flag is defined:
    var FLAG_A = 1; // 0001
    var FLAG_B = 2; // 0010
    var FLAG_C = 4; // 0100
    var FLAG_D = 8; // 1000

    creating new Bitmasks
    var mask = FLAG_A | FLAG_B | FLAG_D; // 0001 | 0010 | 1000 => 1011

    Convert binary string to decimal number
    e.g. var decNumber = parseInt("1011", 2); => 11

    Convert decimal number to binary string
    var nMyNumber = 11;
    var sBinString = nMyNumber.toString(2); => "1011"
*/

/*
ES6 changes
let
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
          let x = 2;  // different variable
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

  let variables declared globally do not become properties of the global object unlike var.
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

Constants
  constants, declared with const, are block-scoped much like variables defined using the let statement. The value of a constant cannot change through re-assignment, and it can't be redeclared within the same scope.

  objects and arrays declared with const can have their elements/keys mutated, but the variable cannot be reassigned to another object/array.

    // NOTE: Constants can be declared with uppercase or lowercase, but a common
    // convention is to use all-uppercase letters.

    // define MY_FAV as a constant and give it the value 7
    const MY_FAV = 7;

    // this will throw an error in Firefox and Chrome (but does not fail in Safari)
    MY_FAV = 20;

    // will print 7
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

Template Literals
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

Arrow Functions
  Can declare functions with () => {} instead of function optionalName() {}.

  if function has a single statement, don't need keyword return
    let double = (a) => a+a; //double(2) returns 4, must omit {} around a+a

  An arrow function does not create its own this context (unlike functions declared with 'function'), so this has the original meaning from the enclosing context. Thus the following code works as expected.

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

  Arrow functions do not bind an arguments object or have their own arguments object, arguments simply refers to whatever is in the outer enclosing scope. However, can use rest parameters as a good alternative
      function foo() {
        var f = (...args) => args[0];
        return f(2);
      }

      foo(1); // 2

  Arrow function expressions are best suited for non-method functions. When used as methods that reference this, this is ignored.
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

Default parameters
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

Spread and rest operators
*/
