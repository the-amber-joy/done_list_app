var express = require('express');
var passport = require('passport');
var pg = require('pg');
var router = express.Router();

router.post('/', passport.authenticate('local', {
    successRedirect: '/menu',
    failureRedirect: '/register'
}));

module.exports = router;