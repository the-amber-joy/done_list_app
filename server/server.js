var express = require('express');
var session = require('express-session');
var passport = require('passport');
var pg = require('pg');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var register = require('./routes/register');
var taskEntry = require('./routes/taskEntry');
var localStrategy = require('passport-local').Strategy;
var app = express();

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

app.use(express.static('server/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                       PASSPORT THINGS                      //
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 300000,
        secure: false
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/register', register);
app.use('/taskEntry', taskEntry);

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
            if(user && user.password === password){ //This checks for existence of username, and whether password matches

                done(null, user); //success
            } else {
                done(null, false, {message: 'Wrong username or password'}); //fail
            }
            client.end();
        });
    });
}));

//sets user's unique id to this logged in session after passing authentication
passport.serializeUser(function(user, done){ //sets the user's unique id value to this session AFTER authentication
    done(null, user.id);
});

//this is where req.user is created
passport.deserializeUser(function(id, done){ //CREATES the req.user -- it grabs the unique id, finds that user, and puts it all back together
    pg.connect(connectionString, function(err, client){
        var user = {};

        var query = client.query('SELECT * FROM users WHERE id = $1', [id]);

        query.on('row', function(row){
            user = row;
            //console.log('req.user object identified (server) as:', user);
            done(null, user);
        });
    });
});




//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                          SERVER                            //
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('Listening on port', app.get('port'));
});