'use strict'

var varuserloginController = require('./userloginControllerService');

module.exports.loginUser = function loginUser(req, res, next) {
  varuserloginController.loginUser(req.swagger.params, res, next);
};