var express = require("express");
var app = express();

app.use(express.static('client'));
app.use('/bower_components', express.static('bower_components'));

app.get('/', function(req, res) {
	res.send('ayy');
});

var server = app.listen(5050, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('To do application is listening on %s:%s', host, port);
});