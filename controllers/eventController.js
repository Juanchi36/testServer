'use strict'

var mongoose = require('mongoose');
var Event = require('../models/Event');
//var vareventController = require('./eventControllerService');

module.exports.getEvent = function getEvent(req, res, next) {
  vareventController.getEvent(req.swagger.params, res, next);
};

module.exports.addEvent = function addEvent(req, res, next) {
  //vareventController.addEvent(req.swagger.params, res, next);
  mongoose.connect('mongodb://127.0.0.1:27017/testDb', {}).then(
    () => {
      var evnt = new Event({
        egmid: req.body.egmid,
        fecha: req.body.fecha,
        sala_id: req.body.sala_id,
        codigo_evento: req.body.codigo_evento
      });
      
      evnt.save(function(err) {
        if (err) res.send(400, {err});
        res.send(200, evnt);
      });
      
    },
    err => { /** handle initial connection error */ }
  );
  // res.send({
  //   msg: 'hola',
  //   request: req.body

  // })
};