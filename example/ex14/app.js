
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var url= require('url');

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

app.get('*', function(req, res) {
	res.sendfile(__dirname + '/error.html');
});

io.on('connection', function(socket){
	var referer = socket.request.headers.referer;
	var address = socket.handshake.address;
	//setTimeout(function() {
		socket.broadcast.emit('chat message', 'test');
	//}, 3000);
	//console.log('a user connected');
	//io.emit('chat message', address + ' : ' + referer);
	// socket.on('chat message', function(msg){
	// 	//console.log('message: ' + msg);
	// 	io.emit('chat message', msg);
	// });
	setInterval(function() {
		io.emit('to all', true);
	}, 3000);
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
//http://blog.johnsonlu.org/category/webdesign/javascript/nodejs/page/2/
//http://www.jianshu.com/p/841565cd9ac8

