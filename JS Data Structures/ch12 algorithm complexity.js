/*
Big O notation to mark complexity/efficiency of algorithms
Most common notations:
  - O(1): Constant
  - O(log(n)): Logarithmic
  - O((log(n))c): Poly-logarithmic
  - O(n): Linear
  - O(n^2): Quadratic
  - O(n^c): Polynomial
  - O(c^n): Exponential

Big-O notation considers CPU (time) usage
*/

/*
Intro to NP-Completeness Theory
- In general, we say an algorithm is efficient if it is O(n^k) for some constant k, and this is called a polynomial algorithm.
- There's another set of algorithms called NP, nondeterministic polynomial. An NP problem is a problem for which the solution can be verified in a polynomial time.
- If a problem P has an algorithm that runs in polynomial, we can also verify its solution in polynomial time. Then, we can conclude that P is subset of, or equal to NP. However, it is unknown whether P = NP.
- NP-Complete problems are the hardest problems in an NP set. A decision problem L is NP-Complete if:
  - L is in NP (that is, any given solution for NP-complete problems can be verified quickly, but there is no known efficient solution).
  - Every problem in NP is reducible to L in polynomial time.
- To understand what the reduction of a problem is, consider L and M as two decision problems. Suppose algorithm A solves L. That is, if y is an input for M, then algorithm B will answer Yes or No depending upon whether y belongs to M or not. The idea is to find a transformation from L to M so that the algorithm B can be part of an algorithm A to solve A.
- We also have another set of problems called NP-Hard. A problem is NP-Hard if it follows property 2 (of NP-Complete), and it does not need to follow property 1. Therefore, NP-Complete set is also a subset of the NP-Hard set.
- Note: Whether P = NP or not is one of the biggest questions in computer science. If someone finds the answer to this question, it would have a major impact in cryptography, algorithm research, artificial intelligence, and many other fields.
- As examples of NP-Hard problems that are not NP-Complete problems, we can mention the halting problem and Boolean Satisfiability problem (SAT).
- As examples of NP-Complete problems, we can also mention the subset sum problem, traveling salesman problem, and vertex cover problem.

Impossible problems and heuristic problems
- Some of these problems we mentioned are impossible to solve. However, there are techniques that can be used to achieve an approximate solution in a satisfactory time. A technique would be using heuristic algorithms. A solution produced by heuristics might not be the best of all solutions, but it is good enough to solve the problem at the time.
- Some examples of heuristics are local search, genetic algorithms, heuristics routing, and machine learning.
- heuristics often used for college or master's degree theses
*/
