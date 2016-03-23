#! /usr/bin/env node
var express = require('express')
var session = require('express-session')
var fs = require('fs')
var app = express()
app.use(session({ secret: 'sego kucing', resave: true, saveUninitialized: true}))
var bodyParser = require('body-parser')
var pjson = require('./package.json');
var parseHtml = require('./lib/parseHtml.js')
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
var port = process.env.PORT ? process.env.PORT : 8080
GLOBAL._sego = {}
_sego.config={}
_sego.config.response = require('./config/response.js')
_sego.config.page = require('./config/page.js')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'))


app.get('/*/', function(req, res, next) {

  if (req.url.indexOf('.html') < 0) {
    var urls = req.url.split('?')
    var url = urls[0]
    parseHtml.executeServerTag('.' + url + '/index.html',req,res)
  } else next()
});

app.get('/*/*.html', function(req, res) {
  console.log('.' + req.url)
  parseHtml.executeServerTag('.' + req.url,req,res)
});

app.post('/*/*.html', upload.array(), function(req, res, next) {
  console.log('.' + req.url)
  parseHtml.executeServerTag('.' + req.url,req,res)
});

app.listen(port);
console.log('Sego '+pjson.version+"\n"+' running on ',port)
