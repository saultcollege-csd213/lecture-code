// If the worker is loaded as a module then ES module imports work as expected
import { doIt } from './expensive.js';
import { timed } from './util.js';

// Make a timed function out of the expensive function
const doItTimed = timed(doIt);

// The 'message' event occurs when the main thread posts a message to the worker
// OR, addEventListener('message', function(event) { ... });
onmessage = event => {
    // The data property of the event object is the message that was sent
    // (May be any JSON-serializable value)
    console.log("Worker got message: " + event.data);

    // Here, we actually do the expensive work
    const result = doItTimed(event.data);

    // The postMessage function sends a message back to the main thread
    // Here, we send the result of the expensive work back to the main thread
    postMessage(result);
};