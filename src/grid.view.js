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
				columns: this.options.columns,
				events: this.options.events
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
			dom += '<th class="' + column.name + '"';
			if (column.custom) {
				dom += '>' + column.display + '</th>';
			} else {
				dom += ' data="' + column.name + '"';
				dom += ' data-sort="';
				if (column.name == this.sortName) {
					dom += this.sortDir;
				}
				dom += '">' + column.display + '</th>';

			}
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

		// cant sort custom columns
		if (column == undefined) return false; 

		this.sortName = column;
		var dir = $(e.target).attr('data-sort');

		this.rows = _.sortBy(this.rows, function(row) {
			return row.model.get(column);
		});

		if (dir == '' || dir == 'desc') {
			
			this.sortDir = 'asc';

		} else if (dir == 'asc') {

			this.sortDir = 'desc';
			this.rows.reverse();

		}


		this.render();

	}

});
