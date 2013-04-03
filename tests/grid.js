describe('Grid View', function() {

	var grid;

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

	var headers = ['id', 'name', 'length'];

	initGrid = function() {
		grid = new App.View.Grid({
			el: '.grid',
			collection: collection,
			headers: headers
		});
	};

	$('body').append('<div class="grid"></div>');

	it('exists', function() {
		expect(App.View.Grid).not.to.be.undefined;
	});

	it('generates headers', function() {
		initGrid();
		grid.render();
		// gather information about the rendered elements
		var headerEls = $(grid.el).find('th');
		// test
		expect(headerEls.length).to.equal(3);
		expect($(headerEls[0]).html()).to.equal(headers[0]);
		// clear it out
		grid.undelegateEvents();
	});

	it('lists out rows', function() {
		initGrid();
		grid.render();
		// gather information about the rendered elements
		// test
		//clear it out
	});

	describe('Grid Row View', function() {
		
		it('exists', function() {
			expect(App.View.Grid_Row).not.to.be.undefined;
		});

	});

});
