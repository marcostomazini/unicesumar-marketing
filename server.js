'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */


// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	} else {
		console.log(chalk.blue('Connected to MongoDB!'));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
var server = app.listen(config.port);

var io = require('socket.io')(server);

var socketio = require('socket.io-client');
var socket = socketio.connect('http://localhost:'+config.port);
console.log(config.port);

app.set('socketio', socket);

socket.emit('message', 'dsaads');	

io.on('connection', function (socket) {
	console.log('Um cliente se conectou');

	socket.on('post', function (post) {
		io.emit('post', post);
	});

	socket.on('message', function(msg) {
		console.log(msg);
        io.sockets.emit('broadcast', {
            payload: msg,
            source: 'from'
        });
    });
});

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('UniMarketing application started on port ' + config.port);