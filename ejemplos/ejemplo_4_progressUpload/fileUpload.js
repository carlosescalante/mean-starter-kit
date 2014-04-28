// /* File uploader */
 
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
	var newFile = fs.createWriteStream('output.txt'),
		fileBytes = request.headers['content-length'],
		uploadedBytes = 0;

	request.pipe(newFile);

	request.on('data', function(chunk){
		uploadedBytes += chunk.length;
		var progress = (uploadedBytes / fileBytes) * 100;
		response.write("progress: " + parseInt(progress, 10) + "%\n");
	});

	request.on('end', function(){
		console.log("File was succesfully uploaded!");
		response.write("File was succesfully uploaded!");
		response.end();
	})
});

server.listen(8080, function(){
	console.log("Listening on port 8080");
});