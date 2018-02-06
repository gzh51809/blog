const http = require('http');

http.createServer((req, res) => {
	res.writeHead(200);
	res.end('Hello world\n');
}).listen(8000);