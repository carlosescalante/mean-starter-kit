var fs = require('fs');
console.log("Started");
var config  = JSON.parse(
	fs.readFileSync("./config.json")
);
console.log("Initial config: ", config);

fs.watchFile("./config.json", function(){
	console.log("File changed!");
	config  = JSON.parse(
		fs.readFileSync("./config.json")
	);
	console.log("New file contents: ", config)
});
