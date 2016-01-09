var _ = require('lodash');

var SocketCollection = function() {
	this.sockets = [];
};

SocketCollection.prototype.add = function(socket) {
	var self = this;
	this.sockets.push(socket);

	socket.on('disconnect', function() {
		self.remove(socket);
	});
};

SocketCollection.prototype.remove = function(socket) {
	_.remove(this.sockets, socket);
};

SocketCollection.prototype.emit = function(name, data) {
	_.forEach(this.sockets, function(socket) {
		socket.emit(name, data);
	});
};

module.exports = SocketCollection;