'use strict'

var crypto = require("crypto");
var keypair = require("keypair");


const demonstrateKeyBasedAsymmetricEncryption = () => {
  var nu = "{ nombre: 'Nombre', apellido: 'Apellido', usuario: 'username' }";

  try {
    // generate a keypair, in asynchronous encryption both keys need to be related
    // and cannot be independently generated keys
    // keylength adheres to the "ECRYPT-CSA Recommendations" on "www.keylength.com"
    // not needed if you already posses public and private key
    let pair = keypair(3072);
    // encrypt String
    let toEncrypt = Buffer.from(nu, "utf8");
    let encrypted = crypto
      .publicEncrypt(pair["public"], toEncrypt)
      .toString("base64");

    // decrypt String
    let toDecrypt = Buffer.from(encrypted, "base64");
    let decrypted = crypto
      .privateDecrypt(pair["private"], toDecrypt)
      .toString("utf8");

    //output 
    var new_nu =  decrypted;
    console.log('Antes: ' + nu);
    console.log('Despues: ' + new_nu);
    console.log("Encriptado:"+ encrypted);
    console.log("Decrypted String and original String are the same: "+
      (nu.localeCompare(new_nu) === 0?"yes":"no"));
    console.log("Public:"+ pair["public"]);
    console.log("Private:"+ pair["private"]);




  } catch (error) {
    console.log(error.message);
  }
};

// run the exampleFunction
demonstrateKeyBasedAsymmetricEncryption();

