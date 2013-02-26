var config;
var chai = require('chai');

chai.should();
var expect = chai.expect;

describe('Fileformats', function () {
	before(function() {
		config = require('../index.js');
	});

	it('should provide a list of supported file formats', function() {
		expect(config().fileformats).not.to.be.undefined;
		config().fileformats.should.be.a('function');
		config().fileformats().should.be.a('array');
	});

	it('should be able to accept new parsers and fileformats', function() {
		config().fileformats.add('abc', function() {});
		expect(config().fileformats()).to.contain('abc');
	});

});