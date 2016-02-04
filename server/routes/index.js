var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');

//Do I need these here, or just on the server???
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

///////////////////////////////////////////////////////////////////////////////////
//            BEGIN TEST BLOCK
///////////////////////////////////////////////////////////////////////////////////

//
//router.get('/*', function (request, response, next){
//    if(request.isAuthenticated()){
//        next();
//    } else {
//        response.redirect('/login');
//    }
//});

///////////////////////////////////////////////////////////////////////////////////
//            END TEST BLOCK
///////////////////////////////////////////////////////////////////////////////////


router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

//route for successful login
router.get('/menu', function(request, response){
    console.log('req.user on success route', request.user);
    response.send('menu');
});

//route for failed login
router.get('/try_again', function(request, response){
    response.send('try_again');
});

router.get('/getUser', function(request, response){
    console.log('Huzzah, a user!', request.user);
    console.log('Authorized:', request.isAuthenticated());
    response.send(request.user);
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/menu',
    failureRedirect: '/try_again'
}));



//router.get('/*', function (request, response, next){
//    if(request.isAuthenticated()){
//        next();
//    } else {
//        response.redirect('/login');
//    }
//});

module.exports = router;