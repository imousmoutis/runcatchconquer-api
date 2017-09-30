const jwt = require('jsonwebtoken'),  
    crypto = require('crypto'),
    bcrypt = require('bcrypt-nodejs')
    config = require('../config/config'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

//Generate the User JWToken
function generateToken(user) {  
  return jwt.sign(user, config.secret, {
    expiresIn: 15780000 
  });
}

//Set the user info for the JWT
function setUserInfo(request) {  
  return {
    _id: request._id,
    gender: request.gender,
    role: request.role
  };
}

exports.login = function(req, res, next) {

  var userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });

};

exports.logout = function(req, res) {

  req.logout();

  res.status(200);
};

// Role authorization check
exports.roleAuthorization = function(role) {  
  return function(req, res, next) {
    
    const user = req.user;

    User.findById(user._id, function(err, foundUser) {
      
      if (err) {
        res.status(422).json({error: 'No user was found.'})
        return next(err);
      }

      // If user is found, check role.
      if (foundUser.role == role) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    })
  };
}

exports.createNewUser = function(req, res) {

	var user = new User(req.body);

	user.password = bcrypt.hashSync(user.password);
  user._id = user.username;

  user.pokemons = [];
  
	user.save(function(err) {

		if (!err)
			res.status(200).send("Created");
		else
			res.status(500).send(err);
  	})
}

exports.getPokemons = function(req, res) {

  User.findById(req.user._id, function(err, user) {
      
    res.json(user.pokemons);
  });
}

exports.releasePokemon = function(req, res) {

  User.update(
    {_id: req.user._id}, 
    {$pull: {pokemons: req.body.pokemon_id}}, 
    {'new': true},
    function(err) {
                  
      if (!err)
        res.status(200).send("Updated");          
      else
        res.status(500).send(err);
            
    });
}