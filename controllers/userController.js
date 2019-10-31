'use strict'

var varuserController = require('./userControllerService');

module.exports.addUser = function addUser(req, res, next) {
  varuserController.addUser(req.swagger.params, res, next);
};