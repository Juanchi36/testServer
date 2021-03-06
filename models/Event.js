const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  egmid: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now
  },
  sala_id: {
    type: Number,
    required: true
  },
  codigo_evento: {
    type: String,
    required: true,
    validate: /^[a-fA-F0-9]+$/,
  },
})

module.exports = mongoose.model('Event', eventSchema)