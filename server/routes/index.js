var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
    console.log('router hit');
});

router.get('/menu', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/menu.html'));
});

router.get('/taskEntry', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/task_entry.html'));
});

router.get('/selectTasks', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/select_tasks.html'));
});

router.get('/history', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/history.html'));
});

router.get('/register', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.get('/login', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/login.html'));
});

router.get('/*', function(request, response){
    response.redirect('/');
});

module.exports = router;