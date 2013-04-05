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

	var columns = ['id', 'name', 'length'];

	$('body').append('<div class="grid"></div>');

	var grid = new App.View.Grid({
		el: '.grid',
		collection: collection,
		columns: columns
	});

	grid.render();

	runTest = function(params) {
		expect(params.expected).to.deep.equal(params.actual);
	}

	afterEach(function() {
		grid.undelegateEvents();
	});

	it('exists', function() {
		expect(App.View.Grid).not.to.be.undefined;
	});

	it('generates headers', function() {

		runTest({
			expected: {
				num_headers: 3,
				first_header: 'id'
			},
			actual: {
				num_headers: $(grid.el).find('th').length,
				first_header: $(grid.el).find('th').first().html()
			}
		});

	});

	it('can have custom header display names');

	it('lists out rows', function() {

		runTest({
			expected: {
				num_columns: 9
			},
			actual: {
				num_columns: $(grid.el).find('tbody tr').length
			}
		});

	});

	it('can be sorted', function() {

		grid.render(); // reset the grid
		$(grid.el).find('th').eq(1).trigger('click');
		$(grid.el).find('th').eq(1).css('color', 'red');

		runTest({
			expected: {
				first_row_name: 'Any Colour You Like',
				last_row_name: 'Us And Them'
			},
			actual: {
				first_row_name: $(grid.el).find('tbody tr').first().find('td').eq(1).html(),
				last_row_name: $(grid.el).find('tbody tr').last().find('td').eq(1).html()
			}
		});

	});

	it('can be sorted two directions');

	describe('Grid Row View', function() {
		
		it('exists', function() {
			expect(App.View.Grid_Row).not.to.be.undefined;
		});

		it('can have custom functionality');

	});

});
