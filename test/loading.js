var config;
var chai = require('chai');

chai.should();
var expect = chai.expect;

var testApp;

describe('Loading', function () {
	before(function() {
		try {
			process.chdir('./test/testapp');
			testApp = process.cwd();
		} catch(err) {
			console.err('chdir: ' + err);
		}

		config = null;

	});

	it('should contain configuration data of the app upon loading', function(done) {
		require('../index.js')(function(err, config) {
			expect(config.test).not.to.be.undefined;
			done();	
		});
	});

	after(function() {
		try {
			process.chdir('../..');
		} catch(err) {
			console.err('chdir: ' + err);
		}
	})
});