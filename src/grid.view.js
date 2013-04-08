App.View.Grid = Backbone.View.extend({
	
	initialize: function() {

		var that = this;

		this.renderEngine = this.options.renderEngine || 'raw';

		// backbone's built in events werent working for generated tags :-/
		$(this.el).on('click', 'th', function(e) { that.sort(e); });

		// store all the row views instead of generating them on every render
		this.rows = _.map(this.collection.models, function(model) {
			return new App.View.Grid_Row({
				model: model,
				renderEngine: this.renderEngine,
				columns: this.options.columns
			});
		}, this);

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
			dom += '<th data-sort="" data="' + column.name + '">' + column.display + '</th>';
		}, this);
		dom += '</tr>';
		dom += '</thead>';
		dom += '<tbody>';

		dom += '</tbody>';
		dom += '</table>';

		$(this.el).html(dom);

		_.each(this.rows, function(row) {
			$(this.el).find('tbody').append(row.render().el);
		}, this);

	},

	sort: function(e) {

		var column = $(e.target).attr('data');
		var sort = $(e.target).attr('data-sort');

		this.rows = _.sortBy(this.rows, function(row) {
			return row.model.get(column);
		});

		console.log('sort', sort);

		if (sort == '' || sort == 'desc') {

			$(e.target).attr('data-sort', 'asc');

		} else if (sort == 'asc') {

			$(e.target).attr('data-sort', 'desc');
			this.rows.reverse();

		}

		this.render();

	}

});
