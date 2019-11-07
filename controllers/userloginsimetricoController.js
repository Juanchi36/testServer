'use strict'

require('dotenv').config();
const crypto = require('crypto');
//var varuserloginsimetricoController = require('./userloginsimetricoControllerService');

module.exports.loginUserSymm = function loginUserSymm(req, res, next) {
  const key = crypto.createHash('sha256').update(String(process.env.SYMM_KEY)).digest('base64').substr(0, 32);
  const iv = crypto.randomBytes(16);
  const data = JSON.stringify({password: 'a12345678$'});
  let cryptdata = '';
  let uncryptdata = '';
  const { usuario, signature } = req.body;

  mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    () => { // Acá me llega el pass haseado de la base
  //     User.findOne({usuario}, function(err, user) {
  //       if (err) throw err;
        
  //       bcrypt.compare(password, user.password).then(match => {
  //         if (match) {
  //         const payload = { usuario: req.body.usuario };
  //         const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
  //         const secret = process.env.SECRET_KEY;
  //         const token = jwt.sign(payload, secret, options);

  //       res.status(200).send({token: token});   
  //         } else {
  //         sendError(res,401,'Authentication error');
  //         }
  //       }).catch(err => {
  //         sendError(res,500,err.message);
  //       });
  //     });                 
  //   },
  //   err => { 
  //     res.status(500).send({
  //       error: 'Error de conexión'
  //     }) 
  //    }
  // );
};

function sendError(res,code,message){
	res.status(code).send({message: message});
};