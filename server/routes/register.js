var express = require("express");
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

router.post('/', function(request, response, next){
    var something = [];

    pg.connect(connectionString, function(err, client){
        if (error) {
            console.log(error);
        }

        var query = client.query('INSERT INTO users (username, password) VALUES $1, $2' ['username', 'password']);

        query.on('row'), function (row){
            username.push(row);
        };

        query.on('end', function () {
            client.end();
        })

    })


});



