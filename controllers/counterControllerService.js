'use strict'

module.exports.addCounter = function addCounter(req, res, next) {
  // let Counter = require('../models/Counter')
  // let ctr = new Counter({
  // email: 'ada.lovelace@gmail.com'
  // })

  res.send({
    //message: req.undefined.schema.properties
    request : req.body
  });
};

module.exports.getCounter = function getCounter(req, res, next) {
  res.send({
    message: 'This is the mockup controller for getCounter'
  });
};