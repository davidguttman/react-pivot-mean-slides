var express = require('express')
var ecstatic = require('ecstatic')

var app = express()

app.use(ecstatic({root: __dirname + '/../public'}))

app.get('/', function(req, res) {

})

module.exports = app
