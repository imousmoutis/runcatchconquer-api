const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    _id: String,
  	username: {
    	type: String,
    	unique: true
  	},
  	password: String,
  	gender: Number,
  	role: {
    	type: String,
    	enum: ['User', 'Admin'],
    	default: 'User'
  	},
    pokemons: [{type: String}]
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {  
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    
    if (err)
      return cb(err);

    cb(null, isMatch);
  })
};

mongoose.model('User', UserSchema);