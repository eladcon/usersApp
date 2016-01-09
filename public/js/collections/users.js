/*global define */
define([
	'underscore',
	'backbone',
	'models/user'
], function (_, Backbone, User) {
	'use strict';

	var UsersCollection = Backbone.Collection.extend({
		model: User,
		url: 'users'
	});

	return new UsersCollection();
});
