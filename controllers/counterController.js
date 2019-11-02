'use strict'

var mongoose = require('mongoose');
var Counter = require('../models/Counter');
var isodate = require('isodate');
var jwt = require('jsonwebtoken');
//var varcounterController = require('./counterControllerService');

module.exports.addCounter = function addCounter(req, res, next) {
  //varcounterController.addCounter(req.swagger.params, res, next);
  mongoose.connect('mongodb://127.0.0.1:27017/testDb', {}).then(
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
        if (err) res.send(400, {err});
        res.send(200, ctr);
      });
      
    },
    err => { /** handle initial connection error */ }
  );
};

module.exports.getCounter = function getCounter(req, res, next) {
  //varcounterController.getCounter(req.swagger.params, res, next);
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
        // res.send({
        //   message: 'Awwwww yeah!!!!'
        // })
        mongoose.connect('mongodb://127.0.0.1:27017/testDb', {}).then(
        () => {
          
          var idMin = isodate(req.query.fecha_desde);
          var idMax = isodate(req.query.fecha_hasta);

          if(!req.query.egmid) {
            Counter.find({fecha:{$gt: idMin, $lt: idMax}}, function(err, counters) {
              if (err) throw err;
              res.send(200, counters);
            });
          }else{
            Counter.find({ $and: [ { fecha: {$gt: idMin, $lt: idMax}}, { egmid: req.query.egmid}]}, function(err, counters) {
              if (err) throw err;
              res.send(200, counters);
            });
          }
            
        },
        err => { /** handle initial connection error */ }
      );
      }
    })
  
};