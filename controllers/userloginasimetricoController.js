'use strict'

require('dotenv').config();
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constants = require('constants');
const padding = constants.RSA_PKCS1_PADDING;

module.exports.loginUserAsymm = function loginUserAsymm(req, res, next) {
  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { 
      const key = crypto.createHash('sha256').update(String(process.env.SYMM_KEY)).digest('base64').substr(0, 32);
      const iv = crypto.randomBytes(16);
      const data = JSON.stringify({password: 'a12345678$'});
      
      let uncryptdata = '';
      const { usuario, signature } = req.body;
      User.findOne({usuario}, function(err, user) {
        let sig = new Buffer(signature);
        if (err) throw err;
        let pub = user.public_key;
        let parsedPub = pub.replace(/%20/g, "\n")
        parsedPub = "-----BEGIN PUBLIC KEY-----" + "\n" + pub + "\n" + "-----END PUBLIC KEY-----";
        
        try {
          
          const clr = crypto.publicDecrypt({ key: parsedPub, padding: padding  }, sig);
          const pass = JSON.parse(clr).password;
          
          bcrypt.compare(pass, user.password).then(match => {
            if (match) {
            const payload = { usuario: req.body.usuario };
            const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
            const secret = process.env.SECRET_KEY;
            const token = jwt.sign(payload, secret, options);
  
          res.status(200).send({token: token});   
            } else {
            sendError(res,401,'Authentication error');
            }
          }).catch(err => {
            sendError(res,500,err.message);
          });
      } catch (exception) {
          throw new Error(exception.message);
      }
        
        
      });                 
    },
    err => { 
      res.status(500).send({
        error: 'Error de conexión'
      }) 
     }
  );
};

function sendError(res,code,message){
	res.status(code).send({message: message});
};