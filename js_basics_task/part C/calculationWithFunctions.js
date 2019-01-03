/*This time we want to write calculations using functions and get the results. 
Let's have a look at some examples:

JavaScript:

seven(times(five())); // must return 35
four(plus(nine())); // must return 13
eight(minus(three())); // must return 5
six(dividedBy(two())); // must return 3

Requirements:

There must be a function for each number from 0 ("zero") to 9 ("nine")
There must be a function for each of the following mathematical operations: plus, minus, times, dividedBy (divided_by in Ruby)
Each calculation consist of exactly one operation and two numbers
The most outer function represents the left operand, the most inner function represents the right operand
Divison should be integer division, e.g eight(dividedBy(three()))/eight(divided_by(three)) should return 2, not 2.666666...
*/


function zero(func) {
    if (func) {
        return func(0);
    } else {
        return 0;
    }
}

  function one(func) {
    if (func) {
        return func(1);
    } else {
        return 1;
    }
  }
  function two(func) {
    if (func) {
        return func(2);
    } else {
        return 2;
    }
  }
  function three(func) {
    if (func) {
        return func(3);
    } else {
        return 3;
    }
  }
  function four(func) {
    if (func) {
        return func(4);
    } else {
        return 4;
    }
  }
  function five(func) {
    if (func) {
        return func(5);
    } else {
        return 5;
    }
  }
  function six(func) {
    if (func) {
        return func(6);
    } else {
        return 6;
    }
  }
  function seven(func) {
    if (func) {
        return func(7);
    } else {
        return 7;
    }
  }
  function eight(func) {
    if (func) {
        return func(8);
    } else {
        return 8;
    }
  }
  function nine(func) {
    if (func) {
        return func(9);
    } else {
        return 9;
    }
  }
  
  function plus(right) {
    return function(left) {
        return left + right;
    }
}
  function minus(right) {
    return function(left) {
        return left - right;
    }
  }
  function times(right) {
    return function(left) {
        return left * right;
    }
  }
  function dividedBy(right) {
    return function(left) {
        return Math.floor(left / right);
    }
  }
