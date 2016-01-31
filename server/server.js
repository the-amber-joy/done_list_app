var express = require('express');
var index = ('./routes/index');
var app = express();

app.use('/', index);


var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port', port);
});