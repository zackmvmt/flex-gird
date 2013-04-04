App.View.Grid_Row = Backbone.View.extend({

	tagName: 'tr',

	initialize: function() {
		this.renderEngine = this.options.renderEngine || raw;
	},

	render: function() {

		if (this.renderEngine == 'raw') {
			var dom = this.renderRaw();
		}

		$(this.el).html(dom);

		return this;

	},

	renderRaw: function() {

		var dom = '';

		_.each(this.options.columns, function(column) {

			dom += '<td>';
			dom += this.model.get(column);
			dom += '</td>';

		}, this);

		return dom;

	}

});
