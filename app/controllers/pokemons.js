const mongoose = require('mongoose'),
 	Pokemon = mongoose.model('Pokemon'),
 	User = mongoose.model('User');

exports.getAllPublic = function(req, res) {

	Pokemon.find({public: true}).populate('options').exec(function(err, pokemons) {
		res.json(pokemons);
	})
}

exports.getAll = function(req, res) {

	Pokemon.find().sort('_id').populate('options').exec(function(err, pokemons) {
		res.json(pokemons);
	})
}

exports.updatePokemon = function(req, res) {

	var pokemon = new Pokemon(req.body);

	Pokemon.update({_id: pokemon._id}, pokemon, function(err) {

		if (!err)
			res.status(200).send("Updated");
		else
			res.status(500).send(err);
  	})
}

exports.addLocation = function(req, res) {

	Pokemon.findByIdAndUpdate(req.body.pokemon_id, {
        $addToSet: {locations: req.body.location},
        }, {'new': true}, function(err, pokemon) {
           	
           	if (!err){

           		var addedLocation = {_id: pokemon._id, name:pokemon.name, location: pokemon.locations[pokemon.locations.length - 1] };

           		var socketIO = global.socketIO; 
           		socketIO.sockets.emit('pokemon:added', addedLocation);

           		res.status(200).send(addedLocation);
           	}
			else
				res.status(500).send(err);
    	}
    );
}

exports.removeLocation = function(req, res) {

	Pokemon.update(
        {_id: req.body.pokemon_id}, 
        {$pull: {locations: {_id: req.body.location_id}}}, 
        function(err) {
			           	
			if (!err){

				var socketIO = global.socketIO; 
           		socketIO.sockets.emit('pokemon:removed', {marker_id: "" +req.body.pokemon_id+ "/" +req.body.location_id});

				res.status(200).send("Updated");
			}
			else
				res.status(500).send(err);
		}
	);

}

exports.catchPokemon = function (req, res) {

	User.findByIdAndUpdate(req.user._id, {
        $addToSet: {pokemons: req.body.pokemon_id}
        }, function(err) {
           	
           	if (!err){

           		Pokemon.update(
           			{_id: req.body.pokemon_id}, 
           			{$pull: {locations: {_id: req.body.location_id}}}, 
           			function(err) {
			           	
			           	if (!err){

			           		var socketIO = global.socketIO; 
           					socketIO.sockets.emit('pokemon:removed', {marker_id: "" +req.body.pokemon_id+ "/" +req.body.location_id});
           					
							res.status(200).send("Updated");
			           	}
						else
							res.status(500).send(err);	
			    	}
			    );

           	}
			else
				res.status(500).send(err);
    	}
    );

}