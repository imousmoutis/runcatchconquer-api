module.exports = function (app) {

	//CORS solution
	app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*")
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
	  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	  next()
	});

	//BodyParser is used to parse json data
	const bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
}