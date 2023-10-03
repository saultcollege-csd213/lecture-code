/*
    Another example of a higher-order function.
    This one takes a function and returns a new function that
    does the same thing, but also records the time it took to
    run the function in an object of the form:
    {
        result: <result of calling f>,
        time: <number of milliseconds it took to run f>
    }
*/
export function timed(f) {
    // Using the gather operator to collect all the arguments into an array
    return function(...args) {      
        const start = Date.now();
        // Calling the original function with the arguments
        // (the spread operator here expands the args array into individual arguments)
        const result = f(...args);
        const end = Date.now();
        return {
            result,
            time: end - start
        };
    }
}