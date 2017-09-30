const pokemons = require('../controllers/pokemons'),
	express = require('express'),
  users= require('../controllers/users'),
  passportService = require('./passport'),
  passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });  
const requireLogin = passport.authenticate('local', { session: false });  

module.exports = function (app) {

	const apiRoutes = express.Router();

	//User Register and Login
	apiRoutes.post('/users/', users.createNewUser);
	apiRoutes.post('/users/login', requireLogin, users.login);
  apiRoutes.get('/users/logout', requireAuth, users.logout);
  apiRoutes.get('/users/pokemons', requireAuth, users.getPokemons);
  apiRoutes.put('/users/pokemons', requireAuth, users.releasePokemon);

  apiRoutes.get('/pokemons/public/', pokemons.getAllPublic);
  apiRoutes.get('/pokemons/', requireAuth, pokemons.getAll);
  apiRoutes.put('/pokemons/', requireAuth, users.roleAuthorization(['Admin']), pokemons.updatePokemon);
  apiRoutes.put('/pokemons/locations/add', requireAuth, users.roleAuthorization(['Admin']), pokemons.addLocation);
  apiRoutes.put('/pokemons/locations/remove', requireAuth, users.roleAuthorization(['Admin']), pokemons.removeLocation);
  apiRoutes.put('/pokemons/catch/', requireAuth, pokemons.catchPokemon);

  app.use('/runcatchconquer-api', apiRoutes);
}