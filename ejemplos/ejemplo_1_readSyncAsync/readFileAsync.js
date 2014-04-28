// require file system module
var fs = require('fs'),
	contents = null;

// Non-Blocking code
console.log("Reading file * asynchronously *...\n");

function readFileCallback(error, data){
	contents = data;
	console.log("Contents of the file: " + contents);
};

fs.readFile('./sometext.txt', readFileCallback);

console.log("Carry on executing\n");