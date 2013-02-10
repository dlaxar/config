var config;
var chai = require('chai');

chai.should();
var expect = chai.expect;

describe('MISC', function () {
	before(function() {
		config = require('../index.js');
	});

	it('should be callable', function() {
		config();
	});

	it('should include the version number of the module (0.0.0)', function() {
		config().version.should.be.eq('0.0.0');
	});
});