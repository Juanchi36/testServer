'use strict';

var fs = require('fs'),
    http = require('http'),
    path = require('path');

var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var currentUsr;

morgan.token('usr', function(req, res) {
  currentUsr = req.body.usuario;
	return req.body.usuario;
});

morgan.token('loggedUsr', function(req, res) {
  return currentUsr;
});

morgan.token('date', function(req, res) {
  var time = new Date().getTime();
  var date = new Date(time);
  return date;
});

morgan.token('json', function(req, res){ return res.statusCode; })

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
var reqLogStream = fs.createWriteStream(path.join(__dirname, 'request.log'), { flags: 'a' });
var resLogStream = fs.createWriteStream(path.join(__dirname, 'response.log'), { flags: 'a' });
app.use('/user/login', morgan(':date :usr :method', { stream: accessLogStream }));
app.use('/user/login/simetrico', morgan(':date :usr :method', { stream: accessLogStream }));
app.use('/user/login/asimetrico', morgan(':date :usr :method', { stream: accessLogStream }));
app.use(morgan(':date :loggedUsr', { stream: reqLogStream }));
app.use(morgan(':date :loggedUsr :json', { stream: resLogStream }));

var oasTools = require('oas-tools');
var jsyaml = require('js-yaml');
var serverPort = 8080;

var spec = fs.readFileSync(path.join(__dirname, '/api/oas-doc.yaml'), 'utf8');
var oasDoc = jsyaml.safeLoad(spec);

var options_object = {
  controllers: path.join(__dirname, './controllers'),
  loglevel: 'info',
  strict: false,
  router: true,
  validator: true,
  //oasSecurity: true,
  securityFile: {
    bearerAuth: verifyToken
  }
};

oasTools.configure(options_object);

oasTools.initialize(oasDoc, app, function() {
  http.createServer(app).listen(serverPort, function() {
    console.log("App running at http://localhost:" + serverPort);
    console.log("________________________________________________________________");
    if (options_object.docs !== false) {
      console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
      console.log("________________________________________________________________");
    }
  });
});

app.post('/info', function(req, res) {
  res.send({
    info: "This API was generated using oas-generator!",
    name: oasDoc.info.title,
  });
});

  function verifyToken(req, secDef, token, next) {
    const bearerRegex = /^Bearer\s/;
    
    if (token && bearerRegex.test(token)) {
      var newToken = token.replace(bearerRegex, '');
      jwt.verify(newToken, process.env.SECRET_KEY,
        {
          expiresIn: '2d',
          issuer: 'https://scotch.io'
        },
        (error, decoded) => {
          if (error === null && decoded) {
            return next();
          }
          return next(req.res.sendStatus(403));
        }
      );
    } else {
      return next(req.res.sendStatus(403));
    }
  }
  

