var express = require('express');
var mongoose = require('mongoose');
var index = require('./routes/index');
var app = express();

mongoose.connect('mongodb://localhost:27017/doneListApp');

app.use('/', index);

app.use(express.static('server/public'));


var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port', port);
});