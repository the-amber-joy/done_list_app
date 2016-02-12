var express = require('express');
var router = express.Router();
var path = require('path');
var passport = require('passport');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';


router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

//redirect non-authenticated users to login page
router.get('/*', function (request, response, next){
    if(request.isAuthenticated()){
        next();
    } else {
        response.send('try_again');
    }
});

router.get('/thankyou', function(request, response){
    response.send('thankyou');
});

//route for successful login
router.get('/menu', function(request, response){
    response.send('menu');
});

//route for failed login
router.get('/try_again', function(request, response){
    response.send('try_again');
});

router.get('/getUser', function(request, response){
    //console.log('logged-in user:', request.user);
    console.log('Is user authenticated?:', request.isAuthenticated());
    response.send(request.user);
});


router.get('/logout', function(request, response) {
    request.logout();
    console.log('is user still authenticated?:', request.isAuthenticated());
    response.status(200).json({status: 'Bye!'});
});

//router.get('/logoutUser', function(request, response){
//    request.logout();
//    response.send('200');
//    //HAVE CLIENT REDIRECT AT THIS POINT??? Why is it not redirecting?
//    console.log('is user still authenticated?:', request.isAuthenticated());
//    response.send('login');
//});

router.post('/', passport.authenticate('local', {
    successRedirect: '/menu',
    failureRedirect: '/try_again'
}));



module.exports = router;