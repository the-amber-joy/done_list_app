var express = require('express');
var index = require('./routes/index');
var app = express();

app.use('/', index);

app.use(express.static('server/public'));


var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port', port);
});