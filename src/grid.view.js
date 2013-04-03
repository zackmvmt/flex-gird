App.View.Grid = Backbone.View.extend({
	
	initialize: function() {},

	render: function() {

		var dom = '<table>';

		// render out the headers
		dom += '<thead>';
		dom += '<tr>';
		_.each(this.options.headers, function(header) {
			dom += '<th data="' + header + '">' + header + '</th>';
		}, this);
		dom += '</tr>';
		dom += '</thead>';
		dom += '<tbody>';



		dom += '</tbody>';
		dom += '</table>';

		$(this.el).html(dom);

	}

});
