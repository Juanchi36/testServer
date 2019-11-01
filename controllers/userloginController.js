'use strict'

var mongoose = require('mongoose');
var User = require('../models/User');
//var varuserloginController = require('./userloginControllerService');

module.exports.loginUser = function loginUser(req, res, next) {
  //varuserloginController.loginUser(req.swagger.params, res, next);
  mongoose.connect('mongodb://127.0.0.1:27017/testDb', {}).then(
    () => {
      User.findOne({$and: [ { usuario: req.body.usuario }, { password: req.body.password}]}, function(err, users) {
        if (err) throw err;
        res.send(200, 'Acá habría que mandar el token');      
      });                 
    },
    err => { /** handle initial connection error */ }
  );
};


// User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
//   // Comprobar si hay errores
//     // Si el usuario existe o no
//     // Y si la contraseña es correcta
//     return res
//       .status(200)
//         .send({token: service.createToken(user)});
// });