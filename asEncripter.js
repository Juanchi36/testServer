var pub = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh7g2wJMkaKwLoVanYikW
E3XwgZoFI+NAiyuhhMpMch/l0Izyk7KQQ55/t/hQSU7NP82p+jo/FRg6yPbMF8XN
ESz9FRx4UqNdkGFb2k3v36+LuMteg02eOhK6XQejtBrKwXKpew9062u4sIKw1mhx
m4wKGNw6b9LlIVLlQXdyiQQV4O2sO0H+3GqdHYWBzK1ombw10tsbpu1zoAlVRG+V
o23TVaJoJKAE72rcFInUfUfc2Pz/+X6M6lpnehv/12sRHyT6wG3EK7RJzFDvj3ZA
y0c1dHo8xTgDC+rA18za1M4Skyw22USDQG/dlCy3tC+2ZR71benOg7zihXys8IW4
ewIDAQAB
-----END PUBLIC KEY-----
`;

var prv = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCHuDbAkyRorAuh
VqdiKRYTdfCBmgUj40CLK6GEykxyH+XQjPKTspBDnn+3+FBJTs0/zan6Oj8VGDrI
9swXxc0RLP0VHHhSo12QYVvaTe/fr4u4y16DTZ46ErpdB6O0GsrBcql7D3Tra7iw
grDWaHGbjAoY3Dpv0uUhUuVBd3KJBBXg7aw7Qf7cap0dhYHMrWiZvDXS2xum7XOg
CVVEb5WjbdNVomgkoATvatwUidR9R9zY/P/5fozqWmd6G//XaxEfJPrAbcQrtEnM
UO+PdkDLRzV0ejzFOAML6sDXzNrUzhKTLDbZRINAb92ULLe0L7ZlHvVt6c6DvOKF
fKzwhbh7AgMBAAECggEASPDSTFFIYhEE9yLxNqpKOQ9LwPucA5uhFqrOVeW7jCJk
it8ViBeRvSW0EpWb4Ko/WSkZT2h6esXY4iTxr10ZRz/cjLoOWKuAH5aTnRIB90AL
Ybe7BepzPVbPXiw66RL1IV6Ug5TdC6GLUyIKFFFxrV1oF9BUf8DicDRzDeo6XjRO
/LU2ZgK8A49erVuqsukCZqetveSp2psJEXK2PNTkZ2MaFVkDwvBmuG7BLEcHipp6
6lfrqwJq7JoAoPNneKG/7w0rLktQ5R6HsC8suE2IRJRkOrvaziUkTdlfqkxrX5PC
YKn7RMYz/V+fe3OatHmAF5l2Mcjd8jytmBaMnoTtIQKBgQDaoJScsx7NUH49qPjt
G2CvK/nvV/PrUBXZbSFKvWwm2PAXaYPJ9XipPcLbjzH4AYouHBqNevTxqi+Iqu7d
2dY97xCV+PQfZYkyd6rT2I8otqSWbvwBSalUjzeczCcel5Ada9msK4UgWx6nWOZw
IEdQKqXo769Mt7C68sTZOoJ0MwKBgQCe63utoo5tm9SiHR/6rPDfv8IKM2zANgM6
dXScL2T97bdjoAr06JQXuvpWwfVZf7HWw9dmRuf91+ug0bwFsB9pHC+W60ZOnSaf
YslWfSIi+2jrom1YLWy8ZCZyYmZb75DjUHyf/4EFDVL6o5+L2sGvUuWuOu6V5JDY
Ao9S0uKimQKBgH0zdsfiQCJ+FT2EdcF7azwF6CTr7nD0tP6F44nkvnnkxGHz+BgB
Lm9lQiDweUI4x4QubfpVzs5SktQmZ5K+/FUNgicQoeUVBaPUKg0VuK4tIkZQGps2
LvWQ6t0tgL2hOFPQ/p/9cEieRgi5/YV6xrwfIFIsaOx7SYdWHer0+d5HAoGBAJmt
/xwaZsF4QFfE8nfnZcf6GBrlP/VgRh7yFqIy8ubcSsv8qJvNjeik2BGt3yV9ZuzY
1iQBzbacZzBNohWeC8IJj7vSKVs8fW0Eis8okyphFUVI/ZSX2N8VulhC79lYAjTQ
ULQo0QuhpuzZ7h/AnCx/bbzfIHmzXp6FWzQs2x2BAoGARU6Ozo5JFMWAPd3/fLPc
/Buwk7G5BYo/qmsKuRWV77fp6w746/zBe/Go0PVlpvLd5Y1+wr61FBbqES4W2yyW
W+AAVHIJHKF4TnH2plLC8+4igyHDw71/WcPxEy2mDxZ/Bq8/UtBTYvbZM2HcSZKN
jB64rblDNHa9ZNci7s8E9BI=
-----END PRIVATE KEY-----
`;

var parsedPub = pub.replace(/\n/g, " ");
//var again = parsedPub.replace(/(.*?\s.*?\s)/g, '\n');
var again = parsedPub.split(" ").join("\n")
//console.log(parsedPub);
//console.log(again);

const crypto = require('crypto');
const constants = require('constants');
const padding = constants.RSA_PKCS1_PADDING;
var firma = {password: 'A12345678$'};
firma = JSON.stringify(firma);
var msg = new Buffer(firma);
//console.log(firma);
console.log(msg);
var sig = crypto.privateEncrypt({ key: prv, padding: padding  }, msg)
//console.log(sig)
//console.log(JSON.stringify(sig));

var clr = crypto.publicDecrypt({ key: pub, padding: padding  }, sig)
// change prv to previous line instead of pub and it returns data as expected.
// this one however throws error of not finding key start line

//console.log(clr.toString());