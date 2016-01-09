'use strict';

define([
	'socketio'
	], function(io) {
	var socket = io.connect();

	return function(Users) {
		socket.on('add', function(user) {
			Users.add(user);
		});

		socket.on('update', function(user) {
			var oldUser = Users.get(user.id);
			oldUser.set(user);
		});

		socket.on('delete', function(id) {
			var user = Users.get(id);
			if (user) {			
				// Remove user from the view and the collection
				user.trigger('destroy');
				Users.remove(id);
			}
		});
	};
});