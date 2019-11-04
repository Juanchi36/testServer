'use strict'

var mongoose = require('mongoose');
var User = require('../models/User');
var jwt = require('jsonwebtoken')
//var isodate = require('isodate');
//var varuserController = require('./userControllerService');

module.exports.addUser = function addUser(req, res, next) {
  //varuserController.addUser(req.swagger.params, res, next);
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
            var usr = new User({
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              usuario: req.body.usuario,
              password: req.body.password,
              status: req.body.status,
              fecha_alta: req.body.fecha_alta,
            });
            
            usr.save(function(err) {
              if (err) res.status(400).send({err});
              res.status(200).send(usr)
            });
            
          },
            err => { /** handle initial connection error */ }
        );
      }
    })
};