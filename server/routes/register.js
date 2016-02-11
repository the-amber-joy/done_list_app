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

        console.log('New Username:', user.username);
        console.log('New Password:', user.password);
        var query = client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [user.username, user.password]);

        query.on('error', function(error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('end', function () {
            response.redirect('/login');
            client.end();
        })
    });
});


module.exports = router;