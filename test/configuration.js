var config;
var chai = require('chai');

chai.should();
var expect = chai.expect;
var testApp;
var originalFormats;
var path = require('path');

describe('Basic configuration', function () {
	before(function() {
		config = require('../index.js');

		try {
			process.chdir('./test/testapp');
			testApp = process.cwd();
		} catch(err) {
			console.err('chdir: ' + err);
		}

		originalFormats = config().fileformats;
		config().fileformats = ['json', 'yaml'];
	});

	it('should provide a search path', function() {
		expect(config().search).not.to.be.undefined;
		config().search.should.be.a('array');
		config().search.length.should.be.gt(0);
	});

	it('should be able to alter the search path', function() {
		var len = config().search.length;
		config().search.push('../config');

		expect(config().search.length - len).to.be.eq(1);
		expect(config().search[len]).to.be.eq('../config');

		config().search.pop();
	});

	it('should be able to locate all configuration files', function(done) {
		expect(config().files).not.to.be.undefined;
		expect(config().files).to.be.a('function');

		config().files(function(err, files) {
			if(err) {
				done(err);
			}
			else {
				expect(files).to.contain(path.relative(testApp, testApp + '/config.json'));
				expect(files).to.contain(path.relative(testApp, testApp + '/config/test.json'));
				done();
			}
			
		})
	});

	it('should be able to locate all configuration files with a specific extension', function(done) {
		expect(config().files).not.to.be.undefined;
		expect(config().files).to.be.a('function');

		config().files('yaml', function(err, files) {
			if(err) {
				done(err);
			}
			else {
				expect(files).to.contain(path.relative(testApp, testApp + '/config/test.yaml'));
				expect(files).length.to.be(1);
				done();
			}
		});
	});

	it('should be able to reload the configuration files', function() {
		expect(config().parse).to.be.a('function');
	});

	after(function() {
		try {
			process.chdir('../..');
		} catch(err) {
			console.err('chdir: ' + err);
		}

		config().fileformats = originalFormats;
	})
})
