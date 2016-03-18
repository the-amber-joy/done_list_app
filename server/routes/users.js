var express = require('express');
var router = express.Router();
var pg = require('pg');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

//var connectionString = process.env.DATABASE_URL || require('../herokuDB.json').data;
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';


passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField:'username'
}, function(req, username, password, done){

    pg.connect(connectionString, function(err, client){
        var user = {};

        var query = client.query('SELECT * FROM users WHERE username = $1', [username]);

        query.on('row', function(row){
            user = row;
        });

        query.on('end', function(){
            if(user && user.password === password){
                done(null, user);
            } else {
                done(null, false, {message: 'Wrong username or password'});
            }
            client.end();
        });
    });
}));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    pg.connect(connectionString, function(err, client){
        var user = {};

        var query = client.query('SELECT * FROM users WHERE id = $1', [id]);

        query.on('row', function(row){
            user = row;
            done(null, user);
        });

        query.on('end', function () {
            client.end();
        });
    });
});

module.exports = router;