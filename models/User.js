// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//   nombre: {
//     type: String,
//     required: true
//   },
//   apellido: {
//     type: String,
//     required: true
//   },
//   usuario: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: Boolean,
//     required: true
//   },
//   fecha_alta: {
//     type: Date,
//     required: true,
//     default: Date.now
//   }
// })

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;