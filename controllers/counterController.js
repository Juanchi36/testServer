'use strict'

var varcounterController = require('./counterControllerService');

module.exports.addCounter = function addCounter(req, res, next) {
  //varcounterController.addCounter(req.swagger.params, res, next);
  res.send({
    request : req.body
  })
};

module.exports.getCounter = function getCounter(req, res, next) {
  varcounterController.getCounter(req.swagger.params, res, next);
};