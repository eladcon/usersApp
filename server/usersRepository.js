var User = require('./user');
var shortid = require('shortid');
var _ = require('lodash');

var UsersRepository = function () {
	this.users = [
		new User('Elad Cohen', shortid.generate()),
		new User('Robert Smith', shortid.generate()),
		new User('John Something', shortid.generate())
	];
};

UsersRepository.prototype.get = function() {
	return this.users;
};

UsersRepository.prototype.add = function(userData) {
	var newUser = new User(userData.name, shortid.generate());
	this.users.push(newUser);
	return newUser;
};

UsersRepository.prototype.update = function(user) {
	var newUser, 
		index = _.findIndex(this.users, { id: user.id });
	if (index !== -1) {
		newUser = new User(user.name, user.id);
		this.users[index] = newUser;
		return newUser;
	}
};

UsersRepository.prototype.delete = function(id) {
	var userToDelete = _.find(this.users, { id: id });
	if (userToDelete) {
		_.pull(this.users, userToDelete);
		return userToDelete;
	}
};

module.exports = UsersRepository;
