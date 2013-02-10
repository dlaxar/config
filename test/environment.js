var config;
var chai = require('chai');

chai.should();
var expect = chai.expect;

describe('Environment', function () {
	before(function() {
		config = require('../index.js');
	});

	it('should be able to return the current environment', function() {
		expect(config().environment()).not.to.be.undefined;
	});

	it('should be able to change the environment', function() {
		config().environment('TEST')
		expect(config().environment()).to.be.eq('TEST');
	});
})