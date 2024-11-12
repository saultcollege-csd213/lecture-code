const button = document.getElementById('button');

// // button.onclick = console.log("Hi 0a");
// button.onclick = function() { console.log("Hi 0b"); }
// // Overwriting an event using the 'on' property will override any previous event handlers
// button.onclick = function() { console.log("Hi 0c"); }



// This does not work because the argument passed to the event listener
// is the RESULT of a function CALL.  It must be a function OBJECT.
button.addEventListener('click', console.log('Hello 1'));

// This works
button.addEventListener('click', function() {
    console.log('Hello 2');
});
// Or this (arrow function)
button.addEventListener('click', () => console.log('Hello 3'));

// Adding/removing event listeners
// const myHandler = function() { console.log('Document clicked'); };
// document.addEventListener('click', myHandler);
// To remove an event, you need a reference to the SAME event handler function
// document.getElementById('remove').addEventListener('click', () => {
//     document.removeEventListener('click', myHandler);
// });

// Be careful with closures!
// The intent below is to print the value of i when each new button is clicked.
// However, because the function passed to the event listener is a closure,
// it will print the value of i when the function is called, not when it is
// created.  So, all the buttons will print the same value of i!
let i = 1;
const addButton = document.getElementById('add');
addButton.addEventListener('click', () => {
    const newButton = document.createElement('button');
    newButton.textContent = "Say " + i;
    //newButton.addEventListener('click', () => console.log("i: " + i));
    // To fix the problem, we need to create a local variable inside the
    // function that is a copy of the value of i when the function is created.
    // This is called "capturing" the value of i.
    const j = i;
    newButton.addEventListener('click', () => console.log("j: " + j));
    document.getElementById("container").appendChild(newButton);
    i += 1;
});


// let i = 0;
// while ( i < 5 ) {
//     // 'i' can be used inside the function because of closure
//     let n = i;
//     button.addEventListener('click', () => console.log(n, i));
//     i += 1;
// }
// BUT clicking the button prints '5' to the console 5 times!
// Because the value of i WHEN THE LISTENER IS CALLED is 5.