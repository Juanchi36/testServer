'use strict'

var mongoose = require('mongoose');
var User = require('../models/User');
//var isodate = require('isodate');
//var varuserController = require('./userControllerService');

module.exports.addUser = function addUser(req, res, next) {
  //varuserController.addUser(req.swagger.params, res, next);
  mongoose.connect('mongodb://127.0.0.1:27017/testDb', {}).then(
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
        if (err) res.send(400, {err});
        res.send(200, usr);
      });
      //res.send(req.body.nombre)
    },
    err => { /** handle initial connection error */ }
  );
};