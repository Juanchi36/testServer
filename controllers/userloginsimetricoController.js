'use strict'

require('dotenv').config();
const crypto = require('crypto');
var mongoose = require('mongoose');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports.loginUserSymm = function loginUserSymm(req, res, next) {
  
  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { 
      const key = crypto.createHash('sha256').update(String(process.env.SYMM_KEY)).digest('base64').substr(0, 32);
      const iv = crypto.randomBytes(16);
      const data = JSON.stringify({password: 'a12345678$'});
      
      let uncryptdata = '';
      const { usuario, signature } = req.body;
      User.findOne({usuario}, function(err, user) {
        if (err) throw err;
      
        try {
          let iv = Buffer.from(signature.iv, 'hex');
          let encryptedText = Buffer.from(signature.encryptedData, 'hex');
          let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv.slice(0, 16));
          let decrypted = decipher.update(encryptedText);
          decrypted = Buffer.concat([decrypted, decipher.final()]);
          uncryptdata = decrypted.toString();
          let pass = JSON.parse(uncryptdata).password
          
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