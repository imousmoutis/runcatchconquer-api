const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

const PokemonSchema = new Schema({
  	_id: String,
  	name: String,
  	public: Boolean,
  	locations: [{lat: Number, lng: Number}]
});

mongoose.model('Pokemon', PokemonSchema);