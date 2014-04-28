/* HTTP Web Server */
var http = require('http');

/* createServer callback executes everytime a request is made to the server*/

var server = http.createServer(function(req, res){
	console.log("A request hit the server!");
	res.writeHead(200, { 'content-type': 'text/plain' });
	res.write("hello\n");
	setInterval(function(){
		res.end("world\n");
	}, 3000);
	
});

server.listen(3000, function(){
	console.log("Server listening on port 3000...");
});