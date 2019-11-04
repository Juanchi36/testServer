'use strict'

var mongoose = require('mongoose');
var Event = require('../models/Event');
var isodate = require('isodate');
var jwt = require('jsonwebtoken')
//var vareventController = require('./eventControllerService');

module.exports.getEvent = function getEvent(req, res, next) {
  //vareventController.getEvent(req.swagger.params, res, next);
  var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, 'Secret Password', function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
        mongoose.connect('mongodb://127.0.0.1:27017/testDb', { useNewUrlParser: true, useUnifiedTopology: true }).then(
          () => {
            
            var idMin = isodate(req.query.fecha_desde);
            var idMax = isodate(req.query.fecha_hasta);
      
            if(!req.query.egmid) {
              Event.find({fecha:{$gt: idMin, $lt: idMax}}, function(err, events) {
                if (err) res.status(400).send({err});
                res.status(200).send(events)
              });
            }else{
              Event.find({ $and: [ { fecha: {$gt: idMin, $lt: idMax}}, { egmid: req.query.egmid}]}, function(err, events) {
                if (err) res.status(400).send({err});
                res.status(200).send(events)
              });
            }
          },
          err => { /** handle initial connection error */ }
        );
      }
    })
};

module.exports.addEvent = function addEvent(req, res, next) {
  //vareventController.addEvent(req.swagger.params, res, next);
  var token = req.headers['authorization']
    if(!token){
        res.status(401).send({
          error: "Es necesario el token de autenticación"
        })
        return
    }

    token = token.replace('Bearer ', '')

    jwt.verify(token, 'Secret Password', function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
        mongoose.connect('mongodb://127.0.0.1:27017/testDb', { useNewUrlParser: true, useUnifiedTopology: true }).then(
          () => {
            var evnt = new Event({
              egmid: req.body.egmid,
              fecha: req.body.fecha,
              sala_id: req.body.sala_id,
              codigo_evento: req.body.codigo_evento
            });
            
            evnt.save(function(err) {
              if (err) res.status(400).send({err});
              res.status(200).send(evnt)
            });
            
          },
          err => { /** handle initial connection error */ }
        );
      }
    })
};