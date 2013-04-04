App.View.Grid = Backbone.View.extend({
	
	initialize: function() {
		this.renderEngine = this.options.renderEngine || 'raw';
	},

	render: function() {

		if (this.renderEngine == 'raw') {
			this.renderRaw();
		}

	},

	renderRaw: function() {

		var dom = '<table>';

		// render out the headers
		dom += '<thead>';
		dom += '<tr>';
		_.each(this.options.columns, function(column) {
			dom += '<th data="' + column + '">' + column + '</th>';
		}, this);
		dom += '</tr>';
		dom += '</thead>';
		dom += '<tbody>';

		dom += '</tbody>';
		dom += '</table>';

		$(this.el).html(dom);

		// loop through the rows and make views
		_.each(this.collection.models, function(model) {

			$(this.el).find('tbody').append(new App.View.Grid_Row({
				model: model,
				renderEngine: this.renderEngine,
				columns: this.options.columns
			}).render().el);

		}, this);

	}

});
