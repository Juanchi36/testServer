require('dotenv').config();
const crypto = require('crypto');
// const secret = '1234567890123456';
const key = crypto.createHash('sha256').update(String(process.env.SYMM_KEY)).digest('base64').substr(0, 32);
const iv = crypto.randomBytes(16);
const data = JSON.stringify({password: 'a12345678$'});
let cryptdata = '';
let uncryptdata = '';

function encrypt(data) {
    try {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(data);
        encrypted = Buffer.concat([encrypted, cipher.final()])
        cryptdata =  { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
        console.log(cryptdata) ;
    } catch (exception) {
        throw new Error(exception.message);
    }
}

encrypt(data);

function decrypt(cryptData) {
    try {
        let iv = Buffer.from(cryptData.iv, 'hex');
        let encryptedText = Buffer.from(cryptData.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv.slice(0, 16));
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        uncryptdata = decrypted.toString();
        console.log(uncryptdata);
    } catch (exception) {
        throw new Error(exception.message);
    }
}
//console.log(cryptdata.iv);
decrypt(cryptdata)