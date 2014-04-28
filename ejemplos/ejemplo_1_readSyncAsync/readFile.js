// require file system module
var fs = require('fs'),
	contents = null;

// Blocking code
console.log("Reading file * synchronously *...\n");

contents = fs.readFileSync('./sometext.txt');
console.log("Contents of the file: " + contents);

console.log("Carry on executing\n");

