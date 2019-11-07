'use strict'

var mongoose = require('mongoose');
var Counter = require('../models/Counter');
var isodate = require('isodate');
var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.addCounter = function addCounter(req, res, next) {
  
  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
          () => {
            var ctr = new Counter({
              egmid: req.body.egmid,
              ci: req.body.ci,
              co: req.body.co,
              jp: req.body.jp,
              jj: req.body.jj,
              drop: req.body.drop,
              cc: req.body.cc,
              fecha: new Date(req.body.fecha),
              sala_id: req.body.sala_id,
            });
            
            ctr.save(function(err) {
              if (err) res.status(400).send({err});
              res.status(200).send(ctr)
            });
            
          },
            err => { 
              res.status(500).send({
                error: 'Error de conexión'
              })
             }
        );
};

module.exports.getCounter = function getCounter(req, res, next) {
    
    mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
        () => {
          
          var idMin = isodate(req.query.fecha_desde);
          var idMax = isodate(req.query.fecha_hasta);

          if(!req.query.egmid) {
            Counter.find({fecha:{$gt: idMin, $lt: idMax}}, function(err, counters) {
              if (err) res.status(400).send({err});
              res.status(200).send(counters)
            });
          }else{
            Counter.find({ $and: [ { fecha: {$gt: idMin, $lt: idMax}}, { egmid: req.query.egmid}]}, function(err, counters) {
              if (err) res.status(400).send({err});
              res.status(200).send(counters)
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