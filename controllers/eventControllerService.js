'use strict'

module.exports.getEvent = function getEvent(req, res, next) {
  res.send({
    message: 'This is the mockup controller for getEvent'
  });
};

module.exports.addEvent = function addEvent(req, res, next) {
  res.send({
    message: 'This is the mockup controller for addEvent'
  });
};