function expensiveCalculation(k) {
    // get timestamp
    //const start = Date.now();
    //console.log("Starting expensive task...");
    let i = 0;
    while ( i < k*100000000 ) {
        i++;
    }
    //const end = Date.now();
    //console.log("...done in " + (end - start) + "ms");

    return i;
}

// const cache = new Map();

// const start = Date.now();
// for ( let i = 0; i < 25; i++ ) {    
//     const r = Math.floor(Math.random() * 10);
//     let result;
//     if ( cache.has(r) ) {
//         result = cache.get(r);
//     } else {
//         result = expensiveCalculation(r);
//         cache.set(r, result);
//     }
//     console.log(result);
// }
// const end = Date.now();
// console.log("...done in " + (end - start) + "ms");











function createCache() {
    const cache = new Map();

    return function cached(f) {
        return function(...args) {
            // Convert the arguments to a string that we will use as a key
            const key = JSON.stringify(args);
            if ( cache.has(key) ) {
                return cache.get(key);
            } else {
                // If we haven't already cached the result of f with
                // these arguments, then call f and cache the result
                const result = f(...args);
                cache.set(key, result);
                return result;
            }
        }
    }
}

// Make the function that can add caching to other functions
const cached = createCache(); 
// Make the cached version of the expensiveCalculation function
const cachedExpensiveCalculation = cached(expensiveCalculation);

// // These calls will all take some time:
// console.log(expensiveCalculation(12));
// console.log(expensiveCalculation(12));
// console.log(expensiveCalculation(12));

// // Only the first of these calls will take some time:
// console.log(cachedExpensiveCalculation(12));
// console.log(cachedExpensiveCalculation(12));
// console.log(cachedExpensiveCalculation(12));

// const start = Date.now();
// for ( let i = 0; i < 25; i++ ) {    
//     const r = Math.floor(Math.random() * 10);
//     const result = expensiveCalculation(r);
//     console.log(result);
// }
//     const end = Date.now();
// console.log("...done in " + (end - start) + "ms");