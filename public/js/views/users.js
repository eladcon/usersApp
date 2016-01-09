define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/users.html',
	'../common'
], function ($, _, Backbone, usersTemplate, common) {
	'use strict';

	var UserView = Backbone.View.extend({

		tagName:  'li',

		template: _.template(usersTemplate),

		events: {
			'click .update':	'edit',
			'click .destroy':	'clear',
			'keypress .edit':	'updateOnEnter',
			'keydown .edit':	'revertOnEscape',
			'blur .edit':		'close'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.$el.html(this.template(this.model.toJSON()));
		},

		render: function () {
			this.$('.name').html(this.model.displayName());
			this.$input = this.$('.edit');
			return this;
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		// Update the user and close the editing state
		close: function () {
			var value = this.$input.val();
			var trimmedValue = value.trim();

			if (trimmedValue) {
				this.model.save({ name: trimmedValue });
			} 
			else {
				return;
			}

			this.$el.removeClass('editing');
		},

		// Update the user on ENTER key
		updateOnEnter: function (e) {
			if (e.keyCode === common.ENTER_KEY) {
				this.close();
			}
		},

		// Leave editing state without saving on ESC key
		revertOnEscape: function (e) {
			if (e.which === common.ESCAPE_KEY) {
				this.$el.removeClass('editing');

				// Also reset the hidden input back to the original value.
				this.$input.val(this.model.get('name'));
			}
		},

		// Delete the item and its view
		clear: function () {
			this.model.destroy();
		}
	});

	return UserView;
});
