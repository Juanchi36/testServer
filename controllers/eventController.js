'use strict'

var vareventController = require('./eventControllerService');

module.exports.getEvent = function getEvent(req, res, next) {
  vareventController.getEvent(req.swagger.params, res, next);
};

module.exports.addEvent = function addEvent(req, res, next) {
  vareventController.addEvent(req.swagger.params, res, next);
};