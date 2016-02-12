var express = require('express');
var passport = require('passport');
var pg = require('pg');
var router = express.Router();

router.get('/success', function(request, response) {
    response.sendStatus(200);
});

router.get('/failure', function(request, response) {
    response.sendStatus(401);
});


module.exports = router;