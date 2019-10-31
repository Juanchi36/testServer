const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
  egmid: {
    type: Number,
    required: true
  },
  ci: {
    type: Number,
    required: true
  },
  co: {
    type: Number,
    required: true
  },
  jp: {
    type: Number,
    required: true
  },
  jj: {
    type: Number,
    required: true
  },
  drop: {
    type: Number,
    required: true
  },
  cc: {
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
})

module.exports = mongoose.model('Counter', counterSchema)