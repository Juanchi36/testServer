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
    required: true,
    validate: /^[a-zA-Z][A-Za-z0-9]+$/,
  },
  password: {
    type: String,
    required: true,
    validate: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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