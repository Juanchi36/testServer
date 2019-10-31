'use strict'

var varuserlogoutController = require('./userlogoutControllerService');

module.exports.logoutUser = function logoutUser(req, res, next) {
  varuserlogoutController.logoutUser(req.swagger.params, res, next);
};