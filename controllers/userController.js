'use strict'

var mongoose = require('mongoose');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.addUser = function addUser(req, res, next) {
  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
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
              res.status(200).send({_id: usr._id})
            });
            
          },
            err => { 
              res.status(500).send({
                error: 'Error de conexión'
              }) 
             }
        );
};