const express = require('express'), 
	fs = require('fs');

//All the configurations are located under the config folder
const config = require('./app/config/config');

//Init the db connection and print each query for debug
const mongoose = require('mongoose').set('debug', false);
mongoose.Promise = global.Promise;

mongoose.connect(config.db);

const models_path = __dirname + '/app/models';
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file);
});

const app = express();
require('./app/config/express')(app);
//require('./app/config/initdb')();
require('./app/config/routes')(app);
require('./app/config/passport')(app);

//Start the app at the port 8080 of the localhost
const port = process.env.PORT || 8080;
const server = app.listen(port);
console.log('run-catch-conquer-api running at port ' + port);

require('./app/config/socket-io')(app, server);

// expose app
exports = module.exports = app;