"use strict";

// Python example:
// def f():
//     return 1

// result = f() # assign result of calling the function to 'result'
// result2 = f  # assign the function itself to 'result2'
// result2()    # call the function

// In JS we can do the same thing:
function f() {
    return 1 + Math.sqrt(2);
}
// // An alternate syntax:
// let f = function() {
//     return 1;
// }
// // Another alternate syntax:
// let f = () => {
//     return 1;
// }
// // This also works:
// let f = () => 1;  // Since the body of the function is just a single expression, 
//                   // we can omit the curly braces and the 'return' keyword

// If the function has arguments:
let add = function(a,b) { return a + b; }
// // or:
// function add(a,b) { return a + b; }
// // or:
// let add = (a,b) => { return a + b };
// // or:
// let add = (a,b) => a + b;

// If the function has one argument:
let square = function(x) { return x * x; }
// or:
// let square = x => x * x;
// square(2);  // 4

let result = f(); // assign result of calling the function to 'result'
let result2 = f;  // assign the function itself to 'result2'
result2();        // call the function
// The above is the same thing as:
f();


function repeat(f, n) {
    for ( let i = 0 ; i < n ; i += 1 ) {
        f();  // Call f
        
    }
}

function printHello() {
    console.log("Hello");
}

repeat(printHello, 3);  // prints "Hello" 3 times
//repeat(printHello(), 5); // (probably) NOT WHAT YOU WANT!!!

const a = [1,2,3,4,5 ];

// A JS map implementation:
/**
 * 
 * @param {function} f The function to apply to each element in a
 * @param {array} a The array to which to apply f
 * @returns {array} An array with each element of a transformed by f
 */
function map(f, a) {
    let result = [];
    // for ( let i = 0 ; i < a.length ; i += 1 ) {
    //     result.push(f(a[i]));
    // }
    // Using for..of:
    for ( let x of a ) {
        result.push(f(x));
    }
    return result;
}

let a2 = map(n => n*2, a);
a2 = a.map(n => n*2);  // Same thing as above using the built-in map method

// A JS filter implementation:
function filter(f, a) {
    let result = [];
    for ( let x of a ) {
        if ( f(x) ) {
            result.push(x);
        }
    }
    return result;
}

let a3 = filter(n => n % 2 === 0, a);
a3 = a.filter(n => n % 2 === 0);  // Same thing as above using the built-in filter method

// A JS reduce implementation:
function reduce(f, a, initial) {
    let result = initial;
    for ( let x of a ) {
        result = f(result, x);
    }
    return result;
}

let a4 = reduce((currentResult,currentItem) => currentResult + currentItem, a, 0);
a4 = a.reduce((currentResult,currentItem) => currentResult + currentItem, 0);  // Same thing as above using the built-in reduce method

// Reduce to product:
let product = a.reduce((currentResult,currentItem) => currentResult * currentItem, 1);//
let asString = a.reduce((currentResult,currentItem) => currentResult + currentItem, "");//

// Map using reduce:
let mappedUsingReduce = a.reduce((currentResult,currentItem) => {
    currentResult.push(currentItem * 2);
    return currentResult;
}, []);

// Filter using reduce:
let filteredUsingReduce = a.reduce((currentResult,currentItem) => {
    if ( currentItem % 2 === 0 ) {
        currentResult.push(currentItem);
    }
    return currentResult;
}, []);



// let args = [1, 2, 3];
// foo(args[0], args[1], args[2]);
// // Or
// foo(...args);  // Spread operator
// function foo(a, b, c) {

// }
