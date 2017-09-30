const mongoose = require('mongoose'),
	User = mongoose.model('User')
 	Pokemon = mongoose.model('Pokemon');

module.exports = function () {

	var admin = new User({
		_id: 'imousmoutis',
		username: 'imousmoutis',
		password: '$2a$10$o/2GTQmp9bDcRLPokM4/Leglu8LDq1yb0gI6zbjPdejBnz9QtPlqK',
		gender: 0,
		role: 'Admin'
	});

	var bulb = new Pokemon({
		_id: '001',
		name: 'Bulbasaur',
		public: true,
		locations: [{lat: '38.46207', lng: '23.59054'}]
	});

	var iv = new Pokemon({
		_id: '002',
		name: 'Ivysaur',
		public: true,
		locations: [{lat: '37.46207', lng: '23.59054'}]
	});

	var ve = new Pokemon({
		_id: '003',
		name: 'Venusaur',
		public: true,
		locations: [{lat: '36.46207', lng: '23.59054'}]
	});

	admin.save();
	bulb.save();
	iv.save();
	ve.save();
}
