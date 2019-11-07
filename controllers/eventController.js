'use strict'

var mongoose = require('mongoose');
var Event = require('../models/Event');
var isodate = require('isodate');
var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.getEvent = function getEvent(req, res, next) {
  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
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
          err => { 
            res.status(500).send({
              error: 'Error de conexión'
            }) 
           }
        );
};

module.exports.addEvent = function addEvent(req, res, next) {
  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
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
          err => { 
            res.status(500).send({
              error: 'Error de conexión'
            })
          }
        );
};