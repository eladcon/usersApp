/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
	'collections/users',
	'views/users',
	'socketClient'
], function ($, _, Backbone, Users, UserView, socketClient) {
	'use strict';

	var AppView = Backbone.View.extend({
		el: '#users-app',

		events: {
			'click #add-user':		'createUser'
		},

		initialize: function () {
			this.$input = this.$('#new-user');
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');
			this.$usersList = this.$('#users-list');

			this.listenTo(Users, 'add', this.addOne);
			this.listenTo(Users, 'reset', this.addAll);
			this.listenTo(Users, 'all', _.debounce(this.render, 0));

			Users.fetch({reset:true});
			socketClient(Users);
		},

		render: function () {
			if (Users.length) {
				this.$main.show();
				this.$footer.hide();
			} else {
				this.$main.hide();
				this.$footer.show();
			}
		},

		addOne: function (user) {
			var view = new UserView({ model: user });
			this.$usersList.append(view.render().el);
		},

		addAll: function () {
			this.$usersList.empty();
			Users.each(this.addOne, this);
		},

		createUser: function (e) {
			var inputVal = this.$input.val().trim()
			if (!inputVal) {
				return;
			}

			Users.create({name: inputVal});
			this.$input.val('');
		},
	});

	return AppView;
});
