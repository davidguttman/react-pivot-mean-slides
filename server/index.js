var express = require('express')
var ecstatic = require('ecstatic')
var JSONStream = require('JSONStream')

var Movie = require('./movie')

var app = express()

app.use(ecstatic({root: __dirname + '/../public'}))

app.get('/data', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'})

  Movie.find()
    .stream()
    .pipe(JSONStream.stringify())
    .pipe(res)
})

module.exports = app
