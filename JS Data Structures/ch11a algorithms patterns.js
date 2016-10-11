/*
Dynamic programming is an optimization technique used to solve complex problems by breaking them into smaller subproblems
  3 steps to follow when solving for DP problems
    1) define the subproblems
    2) implement the recurrence that solves the subproblems
    3) recognize and solve the base cases
  DP problems common for interviewing at big companies like google, amazon, microsoft, oracle, etc.
*/

//Minimum coin change problem
  //finding the minimum number of coins needed to make a particular amount of cents using a given amount of set denominations d1... dn.
  //example, the United States has the following denominations (coins): d1 = 1; d2 = 5; d3 = 10; and d4 = 25.
    //If we need to make change for 36 cents, we can use 1 quarter (25), 1 dime (10), and 1 penny (1).
function MinCoinChange(coins) { //class that stores coins, cache, and makeChange method

  var cache = {};

  this.makeChange = function(amount) { //recursive function that solves the problem
    var me = this; //preserves context
    if (!amount) { //if amount is not positive, return empty array
      return [];
    }
    if (cache[amount]) { //if result is already cached for the given amount, return the cached result
      return cache[amount];
    }
    var min = [];
    var newMin;
    var newAmount;

    for (var i=0; i<coins.length; i++) { //traverse through donominations of coins
      var coin = coins[i];
      newAmount = amount - coin; //difference between amount and coin is newAmount
      if (newAmount >= 0) {
        newMin = me.makeChange(newAmount); //recursion here, will have a variation for every coin if coin <= amount
      }
      if (
          newAmount >= 0 && //test if newAmount is valid
          (newMin.length < min.length-1 || !min.length) && //test if newMin is the best result
          (newMin.length || !newAmount) //test if newMin and newAmount are valid values
          ) {
            min = [coin].concat(newMin); //if tests pass, we have a better result than the previous one
            console.log('new Min ' + min + ' for ' + amount);
        }
    }
    return (cache[amount] = min); //return final result
  };
}

var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36));
//output
  // new Min 1 for 1
  // new Min 1,1 for 2
  // new Min 1,1,1 for 3
  // new Min 1,1,1,1 for 4
  // new Min 1,1,1,1,1 for 5
  // new Min 5 for 5
  // new Min 1,5 for 6
  // new Min 1,1,5 for 7
  // new Min 1,1,1,5 for 8
  // new Min 1,1,1,1,5 for 9
  // new Min 1,1,1,1,1,5 for 10
  // new Min 5,5 for 10
  // new Min 10 for 10
  // new Min 1,10 for 11
  // new Min 1,1,10 for 12
  // new Min 1,1,1,10 for 13
  // new Min 1,1,1,1,10 for 14
  // new Min 1,1,1,1,1,10 for 15
  // new Min 5,10 for 15
  // new Min 1,5,10 for 16
  // new Min 1,1,5,10 for 17
  // new Min 1,1,1,5,10 for 18
  // new Min 1,1,1,1,5,10 for 19
  // new Min 1,1,1,1,1,5,10 for 20
  // new Min 5,5,10 for 20
  // new Min 10,10 for 20
  // new Min 1,10,10 for 21
  // new Min 1,1,10,10 for 22
  // new Min 1,1,1,10,10 for 23
  // new Min 1,1,1,1,10,10 for 24
  // new Min 1,1,1,1,1,10,10 for 25
  // new Min 5,10,10 for 25
  // new Min 25 for 25
  // new Min 1,25 for 26
  // new Min 1,1,25 for 27
  // new Min 1,1,1,25 for 28
  // new Min 1,1,1,1,25 for 29
  // new Min 1,1,1,1,1,25 for 30
  // new Min 5,25 for 30
  // new Min 1,5,25 for 31
  // new Min 1,1,5,25 for 32
  // new Min 1,1,1,5,25 for 33
  // new Min 1,1,1,1,5,25 for 34
  // new Min 1,1,1,1,1,5,25 for 35
  // new Min 5,5,25 for 35
  // new Min 10,25 for 35
  // new Min 1,10,25 for 36
  // [ 1, 10, 25 ]

var minCoinChange2 = new MinCoinChange([1, 3, 4]);
console.log(minCoinChange2.makeChange(6));
//output
  // new Min 1 for 1
  // new Min 1,1 for 2
  // new Min 1,1,1 for 3
  // new Min 3 for 3
  // new Min 1,3 for 4
  // new Min 4 for 4
  // new Min 1,4 for 5
  // new Min 1,1,4 for 6
  // new Min 3,3 for 6
  // [ 3, 3 ]

//Greedy solution to min coin change
function MinCoinChange(coins){
  var cache = {};

  this.makeChange = function(amount) {
    var change = [],
      total = 0;
    for (var i=coins.length-1; i>=0; i--) {
      var coin = coins[i];
      while (total + coin <= amount) {
        change.push(coin);
        total += coin;
      }
    }
    return change;
  };
}

var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(36));
//output [25, 10, 1]

var minCoinChange2 = new MinCoinChange([1, 3, 4]);
console.log(minCoinChange2.makeChange(6));
//output [4, 1, 1]

/*
Knapsack Problem
a combinatorial optimization problem. It can be described as follows: given a fixed-size knapsack with a capacity to carry W amount of weight and a set of items that have a value and weight, find the best solution in a way to fill the knapsack with the most valuable items so that the total weight is less than or equal to W.
*/

//DP solution to knapsack problem
function knapSack(capacity, weights, values, n) {
  var i, w, a, b, kS = [];

  for (i = 0; i <= n; i++) { //initialize matrix used to find the solution
    kS[i] = [];
  }

  for (i = 0; i <= n; i++) {
    for (w = 0; w <= capacity; w++) {
      if (i === 0 || w === 0) { //ignore the first column and row of the matrix so that we can work only with indexes different from 0
        kS[i][w] = 0;
      } else if (weights[i-1] <= w) { //Item i can only be part of the solution if its weight is less than the constraint (capacity)
        a = values[i-1] + kS[i-1][w-weights[i-1]];
        b = kS[i-1][w];
        kS[i][w] = (a > b) ? a : b; //max(a,b), When we find that an item can be part of solution, we will choose the one with the maximum value
        console.log(a + ' can be part of the solution');
      } else{
        kS[i][w] = kS[i-1][w]; //if total weight > capacity, we will simply ignore its value and use the previous one
      }
    }
    console.log(kS[i].join());
  }
  //extra algorithm to find the items that are part of the solution
  findValues(n, capacity, kS, values, weights);
  return kS[n][capacity]; //solution found in the last cell of 2d table, which is found in the lower-right corner of the table.

}

function findValues(n, capacity, kS, weights, values) {
  var i=n, k=capacity;

  console.log('Items that are part of the solution:');

  while (i>0 && k>0) {
    if (kS[i][k] !== kS[i-1][k]){
      console.log('item '+i+' can be part of solution w,v: ' + weights[i-1] + ',' + values[i-1]);
      i--;
      k = k - kS[i][k];
    } else {
      i--;
    }
  }
}

var values = [3,4,5],
    weights = [2,3,4],
    capacity = 5,
    n = values.length;

console.log('Total value that can be carried: ' + knapSack(capacity, weights, values, n));

//Knapsack problem solved recursively
function knapSack(capacity, weights, values, n) {
  if (n === 0 || capacity === 0) {
    return 0;
  }
  if (weights[n-1] > capacity){
    return knapSack(capacity, weights, values, n-1);
  } else {
    //a is last item in values, new capacity is capacity - weight of last item in weights, n decreases by 1 since we added an item
    var a = values[n-1] + knapSack(capacity-weights[n-1], weights, values, n-1);
    //go with n-1 to use lesser weights and values
    var b = knapSack(capacity, weights, values, n-1);
    return (a > b) ? a : b;
  }
}

var values = [3,4,5],
    weights = [2,3,4],
    capacity = 5,
    n = values.length;

console.log(knapSack(capacity, weights, values, n)); //logs 7, represents total value that can be carried

//Knapsack problem, greedy solution, can use fractions of items to add to knapsack
function knapSack(capacity, values, weights) {
  var n = values.length,
      load = 0,
      i = 0,
      val = 0;

  for (i=0; i<n && load < capacity; i++) { //While the total load is less than the capacity, we will iterate the items
    //If we can use the total weight of the item, then we will add it to the total value (val) and update the current load of the knapsack
    if (weights[i] <= (capacity-load)) {
      val += values[i];
      load += weights[i];
      console.log('using item ' + (i+1) + ' for the solution');
    } else {
      //If we cannot use the total weight of the item, we will calculate what is the ratio (r) that we can use
      var r = (capacity-load)/weights[i]; 
      val += r * values[i];
      load += weights[i];
      console.log('using ratio of ' + r + ' for item ' + (i+1) + ' for the solution');
    }
  }
  return val;
}

var values = [3,4,5],
    weights = [2,3,4],
    capacity = 6,
    n = values.length;

console.log(knapSack(capacity, values, weights));

/*
Longest Common Sequence Problem
- consists of finding the length of the longest sub­sequence in two string sequences. The longest subsequence is a sequence that appears in the same relative order but not necessarily contiguous (not substring) in both strings
- e.g.
  string 1: 'acbaed'
  string 2: 'abcadf'
  longest common sequence is acad with length of 4
*/

//LCS DP solution, doesn't print algorithm
function lcs(wordX, wordY) {
  var m = wordX.length,
      n = wordY.length,
      l = [],
      i, j, a, b;

  for (i = 0; i <= m; ++i) {
    l[i] = [];
    for (j = 0; j <= n; ++j) {
      l[i][j] = 0;
    }
  }

  for (i=0; i<=m; i++) {
    for (j=0; j<=n; j++) {
      if (i === 0 || j === 0){
        l[i][j] = 0;
      } else if (wordX[i-1] == wordY[j-1]) {
        l[i][j] = l[i-1][j-1] + 1;
      } else {
        a = l[i-1][j];
        b = l[i][j-1];
        l[i][j] = (a > b) ? a : b; //max(a,b)
      }
    }
    console.log(l[i].join());
  }
  return l[m][n];
}

//complete algorithm that prints the LCS as well
function lcs2(wordX, wordY) {
  var m = wordX.length,
      n = wordY.length,
      l = [],
      solution = [],
      i, j, a, b;

  for (i = 0; i <= m; ++i) {
    l[i] = [];
    solution[i] = [];
    for (j = 0; j <= n; ++j) {
      l[i][j] = 0;
      solution[i][j] = '0';
    }
  }

  for (i=0; i<=m; i++) {
    for (j=0; j<=n; j++) {
      if (i === 0 || j === 0){
        l[i][j] = 0;
      } else if (wordX[i-1] == wordY[j-1]) {
        l[i][j] = l[i-1][j-1] + 1;
        solution[i][j] = 'diagonal';
      } else {
        a = l[i-1][j];
        b = l[i][j-1];
        l[i][j] = (a > b) ? a : b; //max(a,b)
        solution[i][j] = (l[i][j] == l[i - 1][j]) ? 'top' : 'left';
      }
    }
    console.log(l[i].join());
    console.log(solution[i].join());
  }
  printSolution(solution, l, wordX, wordY, m, n);
  return l[m][n];
}

function printSolution(solution, l, wordX, wordY, m, n){
  var a = m, b = n, i, j,
      x = solution[a][b],
      answer = '';

  while (x !== '0') {
    if (solution[a][b] === 'diagonal') {
      answer = wordX[a - 1] + answer;
      a--;
      b--;
    } else if (solution[a][b] === 'left') {
      b--;
    } else if (solution[a][b] === 'top') {
      a--;
    }
    x = solution[a][b];
  }

  console.log('lcs: '+ answer);
}

var wordX = 'acbaed',
    wordY = 'abcadf';

console.log(lcs2(wordX, wordY));

//LCS recursive solution
function lcs(wordwordX, wordwordY, m, n) {
  if (m === 0 || n === 0){
    return 0;
  }

  if (wordwordX[m-1] === wordwordY[n-1]){
    return 1 + lcs(wordwordX, wordwordY, m-1, n-1);
  } else {
    var a = lcs(wordwordX, wordwordY, m, n-1),
        b = lcs(wordwordX, wordwordY, m-1, n);
    return (a > b) ? a : b;
  }
}

var wordX = 'acbaed',
    wordY = 'abcadf';

console.log(lcs(wordX, wordY, wordX.length, wordY.length));

/*
Matrix Chain Multiplication
- finding the best way (order) of multiplying a set of matrices
- To multiply two matrices, A being a matrix m by n and B a matrix m by p. The result is matrix C, n by p.
- consider that we want to multiply A*B*C*D. As multiplication is associative, we can multiple these matrices in any order. So, let's consider the following:
  A is a 10 by 100 matrix
  B is a 100 by 5 matrix
  C is a 5 by 50 matrix
  D is a 50 by 1 matrix
  The result is a A*B*C*D 10 by 1 matrix
- Within this example, there are five ways of doing this multiplication:
  (A(B(CD))): The total of the multiplications is 1,750.
  ((AB)(CD)): The total of the multiplications is 5,300.
  (((AB)C)D): The total of the multiplications is 8,000.
  ((A(BC))D): The total of the multiplications is 75,500.
  (A((BC)D)): The total of the multiplications is 31,000.
- order of the multiplication can make a difference in the total number of multiplications performed
  - create an algorithm to find the minimum number of operations
*/

//DP Solution to Matrix Chain
function matrixChainOrder(p, n) {
  var i, j, k, l, q,
      m = [], s=[];

  for (i = 1; i <= n; i++){
    m[i] = [];
    m[i][i] = 0;
  }

  for (i = 0; i <= n; i++){ //to help printing the optimal solution
    s[i] = []; //auxiliary
    for (j=0; j<=n; j++){
      s[i][j] = 0;
    }
  }

  for (l=2; l<n; l++) {
    for (i=1; i<=n-l+1; i++) {
      j = i+l-1;
      m[i][j] = Number.MAX_SAFE_INTEGER;
      for (k=i; k<=j-1; k++) {
        // q = cost/scalar multiplications
        q = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j];
        if (q < m[i][j]){
          m[i][j] = q;
          s[i][j]=k; // s[i,j] = Second auxiliary table that stores k
        }
      }
    }
  }
  console.log(m);
  console.log(s);

  printOptimalParenthesis(s, 1, n-1);

  return m[1][n-1];
}

function printOptimalParenthesis(s, i, j){
  if(i == j) {
    console.log("A[" + i + "]");
  } else {
    console.log("(");
    printOptimalParenthesis(s, i, s[i][j]);
    printOptimalParenthesis(s, s[i][j] + 1, j);
    console.log(")");
  }
}

// Matrix Ai has dimension p[i-1] x p[i] for i = 1..n
var p = [10, 100, 5, 50, 1],
    n = p.length;
console.log(matrixChainOrder(p, n));


//Matrix Chain Recursive solution
function matrixChainOrder(p, i, j){
  if(i == j) {
    return 0;
  }

  var k, count,
     min = Number.MAX_SAFE_INTEGER;

  for (k = i; k <j; k++) {
    count = matrixChainOrder(p, i, k) +
        matrixChainOrder(p, k+1, j) +
        p[i-1]*p[k]*p[j];

    if (count < min){
      min = count;
    }
  }

  return min;
}

var p = [10, 100, 5, 50, 1],
    n = p.length;

console.log(matrixChainOrder(p, 1, n-1));


/*
Greedy algorithms, they solve for the locally optimal choice, i.e. the best solution at the time
- Greedy algorithms are simpler and also faster than dynamic programming algorithms. However, as we can note, it does not give the optimal answer all the time. However, on average, it would output an acceptable solution for the time it takes to execute.


*/
