var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

router.get('/', function(request, response){
    var user = request.user;
    var tasks = [];

    pg.connect(connectionString, function(error, client){
        if (error) {
            console.log(error);
        }

        var query = client.query('SELECT * FROM task_dates JOIN tasks ON tasks.id = task_dates.task_id JOIN users ON users.id = tasks.user_id WHERE users.username = ($1)', [user.username]);

        query.on('error', function(error){
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            tasks.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(tasks);
        });
    });
});


module.exports = router;