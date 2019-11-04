const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
  egmid: {
    type: Number,
    required: true
  },
  ci: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999999999999,
  },
  co: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999999999999,
  },
  jp: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999999999999,
  },
  jj: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999999999999,
  },
  drop: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999999999999,
  },
  cc: {
    type: Number,
    required: true,
    min: 0,
    max: 999999999999999999,
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