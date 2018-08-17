// ----- DEPENDENCIES -----

const garfield = require('./garfield.js');

// -------- TESTS --------

console.log("Requested comic: " + garfield.request(2018, 2, 12)); //replace the numbers with your own numbers for personal testing
console.log("Random comic: " + garfield.random());
console.log("Latest comic: " + garfield.latest());
console.log("Comic count: " + garfield.count);
