describe('Grid View', function() {

	// data set and common variables (abstract?)
	var collection = new Backbone.Collection([
		{ id: 1, name: 'Speak To Me/Breathe', length: '3:58' },
		{ id: 2, name: 'On The Run', length: '3:33' },
		{ id: 3, name: 'Time', length: '7:06' },
		{ id: 4, name: 'The Great Gig In The Sky', length: '4:48' },
		{ id: 5, name: 'Money', length: '6:24' },
		{ id: 6, name: 'Us And Them', length: '7:49' },
		{ id: 7, name: 'Any Colour You Like', length: '3:26' },
		{ id: 8, name: 'Brain Damage', length: '3:51' },
		{ id: 9, name: 'Eclipse', length: '2:07' }
	]);

	$('body').append('<div class="grid"></div>');

	var grid = new App.View.Grid({
		el: '.grid',
		collection: collection,
		columns: [
			{ name: 'id', display: '#' },
			{ name: 'name', display: 'Album Name' },
			{ name: 'length', display: 'Duration' },
			{ custom: true, name: 'action', display: 'Action', content: {
				format: 'raw',
				data: '<span class="btn show">color</span> | <span class="btn time">time</span>'
			} }
		],
		events: [
			{
				e: 'click',
				target: '.show',
				action: function(e) {
					var tr = $(this).parents('tr');
					tr.css('color', 'red');
				}
			},
			{
				e: 'click',
				target: '.time',
				action: function(e) {
					var id = $(this).parents('tr').attr('data');
					var model = grid.collection.get(id);
					var view = _.find(grid.rows, function(row) { return row.model == model; });
					model.set('length', '4:44');
					view.render();
				}
			}
		]
	});

	grid.render();

	runTest = function(params) {
		expect(params.expected).to.deep.equal(params.actual);
	}

	beforeEach(function() {
		grid.render();
	});

	afterEach(function() {
		grid.undelegateEvents();
	});

	it('exists', function() {
		expect(App.View.Grid).not.to.be.undefined;
	});

	it('generates headers', function() {

		var test = {
			expected: {
				num_headers: 4,
				first_header: 'id'
			},
			actual: {
				num_headers: $(grid.el).find('th').length,
				first_header: $(grid.el).find('th').first().attr('data')
			}
		};

		runTest(test);

	});

	it('can have custom header display names', function() {
		
		var test = {
			expected: {
				first_header: '#',
				second_header: 'Album Name'
			},
			actual: {
				first_header: $(grid.el).find('th').eq(0).html(),
				second_header: $(grid.el).find('th').eq(1).html()
			}
		};

		runTest(test);
		
	});

	it('lists out rows', function() {

		var test = {
			expected: {
				num_columns: 9
			},
			actual: {
				num_columns: $(grid.el).find('tbody tr').length
			}
		};

		runTest(test);

	});

	it('can be sorted', function() {

		$(grid.el).find('th').eq(1).trigger('click');

		var test = {
			expected: {
				first_row_name: 'Any Colour You Like',
				last_row_name: 'Us And Them'
			},
			actual: {
				first_row_name: $(grid.el).find('tbody tr').first().find('td').eq(1).html(),
				last_row_name: $(grid.el).find('tbody tr').last().find('td').eq(1).html()
			}
		};

		runTest(test);

	});

	it('can be sorted two directions', function() {
		
		$(grid.el).find('th').eq(1).trigger('click').delay(10).trigger('click');

		var test = {
			expected: {
				first_row_name: 'Us And Them',
				last_row_name: 'Any Colour You Like'
			},
			actual: {
				first_row_name: $(grid.el).find('tbody tr').first().find('td').eq(1).html(),
				last_row_name: $(grid.el).find('tbody tr').last().find('td').eq(1).html()
			}
		};

		runTest(test);

	});

	it('can have custom columns', function() {

		var test = {
			expected: {
				last_column: 'Action'
			},
			actual: {
				last_column: $(grid.el).find('thead th').last().html()
			}
		};

		runTest(test);

	});

	describe('Grid Row View', function() {
		
		it('exists', function() {
			expect(App.View.Grid_Row).not.to.be.undefined;
		});

		it('can have custom content', function() {

			var test = {
				expected: {
					custom_cell_btns: 2
				},
				actual: {
					custom_cell_btns: $(grid.el).find('tbody tr').first().find('td').last().find('.btn').length
				}
			};

			runTest(test);

		});

		it('can have custom events', function() {

			$(grid.el).find('tbody tr').first().find('td').last().find('.show').trigger('click');

			var test = {
				expected: {
					row_color: 'rgb(255, 0, 0)'
				},
				actual: {
					row_color: $(grid.el).find('tbody tr').first().css('color')
				}
			};

			runTest(test);

		});

		it('can have events that access the model', function() {

			$(grid.el).find('tbody tr').eq(1).find('td').last().find('.time').trigger('click');
			
			var test = {
				expected: {
					new_time: '4:44'
				},
				actual: {
					new_time: $(grid.el).find('tbody tr').eq(1).find('td').eq(2).html()
				}
			};
			
			runTest(test);

		});

		it('can have custom content that access the model');

	});

});
