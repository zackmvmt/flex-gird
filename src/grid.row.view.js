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

		// add the model id to the grid
		$(this.el).attr('data', this.model.id);

		// set up row events...doing it here so the events stick
		_.each(this.options.events, function(e) {

			$(this.el).on(e.e, e.target, e.action);

		}, this);

		return this;

	},

	renderRaw: function() {

		var dom = '';

		_.each(this.options.columns, function(column) {

			dom += '<td class="' + column.name + '">';

			if (column.custom) {
				if (column.content.format == 'raw') {
					dom += column.content.data;
				}
			} else {
				dom += this.model.get(column.name);
			}
			dom += '</td>';

		}, this);

		return dom;

	}

});
