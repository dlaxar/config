var config;
var chai = require('chai');

chai.should();
var expect = chai.expect;

describe('JSON Configuration files', function () {
	before(function() {
		config = require('../index.js');
	});

	it('should contain json as a file format', function() {
		expect(config().fileformats()).to.contain('json');
	});

	it('should be able to parse a json file', function() {
		var c = config().parse('json', 'test/testdata/parseTest.json');
		expect(c).to.have.property('0').that.is.an('array').with.length(4);
		expect(c).to.have.deep.property('lv0.level1').that.is.a('string').and.eq('string');
		expect(c).to.have.deep.property('lv0.level2[0]').that.is.a('string').and.eq('nested');
		expect(c).to.have.deep.property('lv0.level3.deeper.ok, that\'s it').that.is.a('boolean').and.to.be.true;
	});

	it('should be able to parse multiple files at once', function() {
		var c = config().parse('json', ['test/testdata/parseTest.json', 'test/testdata/noConflictParse.json']);
		expect(c).to.have.deep.property('lv0.level1').that.is.a('string').and.eq('string');
		expect(c).to.have.deep.property('lv0.level2[0]').that.is.a('string').and.eq('nested');
		expect(c).to.have.deep.property('lv0.level3.deeper.ok, that\'s it').that.is.a('boolean').and.to.be.true;
		expect(c).to.have.property('author').that.is.eq('Daniel Laxar');
	})

	it('should be able to merge multiple json files, overwriting deeply and in correct order', function() {
		var c = config().parse('json', ['test/testdata/parseTest.json', 'test/testdata/parseDeepTest.json', 'test/testdata/noConflictParse.json']);
		expect(c).to.have.property('0').that.is.an('array').with.length(5);
		expect(c).to.have.deep.property('lv0.level1').that.is.a('string').and.eq('string');
		expect(c).to.have.deep.property('lv0.level2[0]').that.is.a('string').and.eq('nested');
		expect(c).to.have.deep.property('lv0.level3.deeper.ok, that\'s it').that.is.a('boolean').and.to.be.false;
		expect(c).to.have.property('author').that.is.eq('Daniel Laxar');
	});
});