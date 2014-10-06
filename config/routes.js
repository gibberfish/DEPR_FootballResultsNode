module.exports = function(app) {
	var routes = require('../routes/index');
	var users = require('../routes/users');
	app.use('/', routes);
	app.use('/users', users);
};
