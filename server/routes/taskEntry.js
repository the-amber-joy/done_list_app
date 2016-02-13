var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

router.post('/history', function(request, response) {
    var tasks = request.body.tasks;
    var userId = request.user.id;
    pg.connect(connectionString, function(err, client, done) {
        if(err) {
            done();
            console.log(err);
            return response.status(500).json({ success: false, data: err});
        }
        for (i = 0; i < tasks.length; i++){
            client.query("INSERT INTO tasks (task_name, user_id) VALUES ($1, $2)", [tasks[i], userId]);
            client.query("INSERT INTO task_dates (date, task_id) VALUES ('today', (SELECT id FROM tasks ORDER BY id DESC LIMIT 1))");
        }
    });
});

module.exports = router;