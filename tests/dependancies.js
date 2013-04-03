describe('Dependancies', function() {

	describe('jQuery', function() {
		it('exists', function() {
			expect($).not.to.be.undefined;
		});
	});

	describe('Backbone', function() {
		it('exists', function() {
			expect(Backbone).not.to.be.undefined;
		});
	});

	describe('Underscore', function() {
		it('exists', function() {
			expect(_).not.to.be.undefined;
		});
	});

	describe('App', function() {

		it('exists', function() {
			expect(App).not.to.be.undefined;
		});

		it('has models', function() {
			expect(App.Model).not.to.be.undefined;
		});

		it('has collections', function() {
			expect(App.Collection).not.to.be.undefined;
		});

		it('has views', function() {
			expect(App.View).not.to.be.undefined;
		});

	});

});
