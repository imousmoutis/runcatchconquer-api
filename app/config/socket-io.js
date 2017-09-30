module.exports = function(app, server) {

	const socketIO = require('socket.io').listen(server);
	global.socketIO = socketIO;

	socketIO.set("transports", ["websocket", "polling"]);
	socketIO.set('origins', '*:*');
	socketIO.sockets.on('connection', function (socket) {
	  	socket.on('disconnect', function () {})
	});
}