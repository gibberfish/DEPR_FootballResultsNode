module.exports = function(dbName) {
	var mongo = require('mongodb');
	var monk = require('monk');
	var db = monk('localhost:27017/'+dbName);

	return db;
};
