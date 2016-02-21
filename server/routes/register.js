var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');
var path = require('path');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

router.post('/', function(request, response){
    var user = request.body;

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        var query = client.query('INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)', [user.username, user.password, user.firstname, user.lastname]);

        query.on('error', function(error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('end', function () {
            client.end();
        });
    });

});


module.exports = router;