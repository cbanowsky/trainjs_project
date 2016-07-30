var connect = require('connect');
var bodyParser = require('body-parser');
var request = require('request');

var app = connect();
app.use(bodyParser.json());
var api = request();
module.exports = app;
module.exports = api;

