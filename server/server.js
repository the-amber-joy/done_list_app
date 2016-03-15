//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                       REQUIREMENTS                         //
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]

var express = require('express');
var session = require('express-session');
var passport = require('passport');
var pg = require('pg');
var bodyParser = require('body-parser')
var index = require('./routes/index');
var register = require('./routes/register');
var logout = require('./routes/logout');
var taskEntry = require('./routes/taskEntry');
var history = require('./routes/history');
var ancient_history = require('./routes/ancient_history');
var users = require('./routes/users');

var app = express();

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
        maxAge: 1000 * 60 * 15,
        secure: false
    }
}));

app.use(passport.initialize());
app.use(passport.session());


//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                          ROUTES                            //
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/taskEntry', taskEntry);
app.use('/history', history);
app.use('/ancient_history', ancient_history);

//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
//                          SERVER                            //
//[][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][]
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log('Listening on port', app.get('port'));
});