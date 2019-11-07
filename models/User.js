const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true,
    validate: /^[a-zA-Z][A-Za-z0-9]+$/,
  },
  password: {
    type: String,
    required: true,
    validate: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$_!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  },
  status: {
    type: Boolean,
    required: true
  },
  fecha_alta: {
    type: Date,
    required: true,
    default: Date.now
  }
});

userSchema.pre('save', function(next){
  const user = this;
  if(!user.isModified || !user.isNew){
      next();
  }else{
      bcrypt.hash(user.password, 10, function(err, hash){
          if(err){
              console.log('Error hashing password for user', user.name);
              next(err);
          } else {
              user.password = hash;
              next();
          }
      });
  }
});

module.exports = mongoose.model('User', userSchema)