var express = require("express");
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

router.post('/', function(request, response){
    var thing = [];

    pg.connect(connectionString, function(err, client){
        var query = client.query('INSERT INTO users (username, password) VALUES $1, $2' ['username', 'password']);

        if (err) {
            console.log(err);
        }

        query.on('row')

    })
});



