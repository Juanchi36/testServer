'use strict'

var mongoose = require('mongoose');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
require('dotenv').config();
//var varuserloginController = require('./userloginControllerService');

module.exports.loginUser = function loginUser(req, res, next) {
  //varuserloginController.loginUser(req.swagger.params, res, next);
  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => {
      User.findOne({$and: [ { usuario: req.body.usuario }, { password: req.body.password}]}, function(err, users) {
        if (err) throw err;
        
        // var tokenData = {
        //   usuario: req.body.usuario,
        //   fecha_alta: req.body.fecha_alta
        // }
        const payload = { usuario: req.body.usuario };
        const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign(payload, secret, options);
        
        res.status(200).send({token: token});
        
      });                 
    },
    err => { 
      res.status(500).send({
        error: 'Error de conexión'
      }) 
     }
  );
};
