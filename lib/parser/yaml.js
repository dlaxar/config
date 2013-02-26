module.exports = function (path) {
	var yaml = require('js-yaml');
	var fs = require('fs');

	var content = fs.readFileSync(path, 'ascii');

	return yaml.safeLoad(content);
}