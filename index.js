var extend = require('node.extend');

var backing = {

	version: '0.0.0',

	search: ['./', './config', './configuration'],

	environment: function(env) {
		if(env) {
			process.env.NODE_ENV = env;
			return env;
		}
		else {
			return process.env.NODE_ENV || false;
		}
	},

	parse: function(extension, file) {
		if(this.fileformats.formats[extension]) {
			var result = {};
			
			if(!Array.isArray(file)) {
				file = [file];
			}

			var self = this;
			file.forEach(function(currentFile) {
				extend(true, result, self.fileformats.formats[extension](currentFile));
			});

			return result;
		}
	},

	files: function(ext, cb) {
		if(typeof(ext) == 'function') {
			cb = ext;
			ext = this.fileformats();
		}

		var base = process.cwd();
		var path = require('path'), fs = require('fs');
		var fileCount = 0;

		var result = [];

		this.search.forEach(function(current, index, array) {
			var search = path.normalize(base + '/' + current);
			fs.exists(search, function(exists) {
				if(exists) {
					fs.readdir(search, function(err, data) {
						if(err) {
							cb(err, null);
						}
						else {
							fileCount += data.length;

							data.forEach(function(file, index, files) {
								fs.stat(search + '/' + file, function(err, stat) {
									if(err) {
										cb(err, null);
									}
									else {
										fileCount--;

										if(stat.isFile() && ext.indexOf(path.extname(file).substring(1)) != -1) {
											result.push(path.relative(base, search + '/' + file));
										}

										if(fileCount == 0) {
											cb(null, result);
										}
									}
								});
							});
						}
					});
				}
			});
		});
	}
};

var fileformats = function() {
	return fileformats.list();
};

fileformats.add = function(extension, parser) {
	fileformats.formats[extension] = parser;
}

fileformats.list = function() {
	return Object.keys(fileformats.formats);
}

fileformats.formats = {};

Object.defineProperty(backing, 'fileformats', {
	writeable: false, 
	value: fileformats
});


var config = function() {
	return 	backing;
};

module.exports = config;

function addFileFormats(dir) {
	var async = require('async');
	var fs = require('fs'), path = require('path');

	var files = fs.readdirSync(dir), file;
	for(var i = 0; i < files.length; i++) {
		file = files[i];

		var stat = fs.statSync(dir + '/' + file);
		if(stat.isFile() && path.extname(file).substring(1) == 'js') {
			var parser = require('./' + path.normalize(dir + '/' + file));

			fileformats.add(path.basename(file, '.js'), parser);
		};
	}
}

addFileFormats('./lib/parser');