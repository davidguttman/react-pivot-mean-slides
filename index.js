var app = require('./server')

var PORT = process.env.PORT || 3000

var server = app.listen(PORT, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Slides listening at http://%s:%s', host, port);

});
