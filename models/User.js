const mongoose = require('mongoose')

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
    required: true
  },
  password: {
    type: String,
    required: true
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
})

module.exports = mongoose.model('User', userSchema)