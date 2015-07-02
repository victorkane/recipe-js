var express = require('express')
var morgan = require('morgan');
var serveStatic = require('serve-static')

var app = express()
app.use(morgan('combined'))
var port = 3000;
app.use(serveStatic(__dirname + '/public'))

app.set('port', process.env.PORT || port)

var server = app.listen(app.get('port'), function () {
  console.log('Static server listening on port %s', server.address().port);
})
