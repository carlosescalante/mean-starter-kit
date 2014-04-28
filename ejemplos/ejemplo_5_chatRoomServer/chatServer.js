/* TCP Server - Telnet chat server */

var net = require('net');
var sockets = [];

var server = net.createServer(function(socket){
	
	sockets.push(socket);

	socket.on('data', function(data){
		for(var i = 0; i < sockets.length; i++) {
			if(sockets[i] == socket) {}
			else{
				sockets[i].write(data);
			}
		}
	})

	socket.on('end', function(){
		console.log("ended");
		var i = sockets.indexOf(socket);
		sockets.splice(i, 1);
	})
})

function onServerInit(){
	console.log("Starting chat server...");
	console.log("process id: ", process.pid);
};

onServerInit();
server.listen(8000)



















































/* TCP Server - Telnet/Netcat chat server */

// var net = require('net'),
// 	sockets = [];

// var server = net.createServer(function(socket){
	
// 	sockets.push(socket);
// 	var message = "";
// 	var delivered = 0;

// 	socket.on('data', function(data){
// 		message += data;
// 		for(var i = 0; i < sockets.length; i++) {
// 			if(sockets[i] == socket) {}
// 			else{
// 				if(data == '\r\n') {
// 					logMessage(i, message);
// 					if(delivered == sockets.length-1) {
// 						message = "";
// 					}
// 				}else{
// 					console.log("socket " + i + " says "+ data);
// 				}
// 				//sockets[i].write(data);	
// 			}
// 		}	
// 	})

// 	function logMessage(index, msg) {
// 		console.log(index, msg);
// 		sockets[index].write(msg + "\r\n");
// 		sockets[index].write(">");
// 		delivered++;
// 	}

// 	socket.on('end', function(){
// 		var i = sockets.indexOf(socket);
// 		sockets.splice(i, 1);
// 	})
// })

// function onServerInit(){
// 	console.log("Starting chat server...");
// 	console.log("process id: ", process.pid);
// 	console.log("listening on port 8000...");
// };

// server.listen(8000, onServerInit)