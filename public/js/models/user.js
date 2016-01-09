define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var User = Backbone.Model.extend({
		displayName: function() {
			var name = this.get('name');
			if (!name) return '';

			var splittedNames = name.split(' ');
			if (splittedNames.length > 1) {
				return splittedNames[0] + " " + splittedNames[1].charAt(0);
			}
			else {
				return name;
			}
		}
	});

	return User;
});
