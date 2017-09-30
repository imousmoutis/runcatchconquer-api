const path = require('path'),
	 rootPath = path.normalize(__dirname + '/..');

module.exports = { 
	//link to the db
    db: '',
    root: rootPath,
    app: {
      name: 'run-catch-conquer-api'
    },
    secret: 'thisisasupersecurekey'
};