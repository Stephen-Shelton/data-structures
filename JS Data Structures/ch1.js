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

  >> = Right shift, shifts bits to the right discarding bits shifted off (does not shift in zeros from the left)

  >>> = zero-fill right shift, same as right shift but also shifts in zeros from the left

  e.g. complements
     314 is 00000000000000000000000100111010
    ~314 is 11111111111111111111111011000101, each bit inverted, same as -315
    -314 is 11111111111111111111111011000110, 2's complement of 314 where 1 is added to the inverted 314 (same as -315 + 1)

  The two's complement guarantees that the left-most bit is 0 when the number is positive and 1 when the number is negative. Thus, it is called the sign bit.
    -2147483648 (base 10) = 10000000000000000000000000000000 (base 2)
     2147483647 (base 10) = 01111111111111111111111111111111 (base 2)
*/
