var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';
//var connectionString = require('../herokuDB.json').data;

router.post('/', function(request, response) {
    var queryOptions = {
        user: request.user.username,
        startDate: request.body.startDate,
        endDate: request.body.endDate
    };
    var oldTasks = [];

    pg.connect(connectionString, function (error, client) {
        if (error) {
            console.log(error);
        }

        //This query returns tasks from the week starting on the specified date
    //    var selectedWeek = "SELECT * FROM task_dates\ \
    //JOIN tasks\
    //    ON tasks.id = task_dates.task_id\
    //JOIN users\
    //    ON users.id = tasks.user_id\
    //WHERE users.username = ($1)\
    //AND date\
    //    BETWEEN ($2) AND (($2)::date + '7 days'::interval) \
    //ORDER BY date ASC";


        //This query returns tasks between the two selected dates
        var selectedWeek = "SELECT * FROM task_dates\ \
    JOIN tasks\
        ON tasks.id = task_dates.task_id\
    JOIN users\
        ON users.id = tasks.user_id\
    WHERE users.username = ($1)\
    AND date\
        BETWEEN ($2) AND ($3)";

        var query = client.query(selectedWeek, [queryOptions.user, queryOptions.startDate, queryOptions.endDate]);

        query.on('error', function (error) {
            console.log(error);
            response.sendStatus(500);
        });

        query.on('row', function (row) {
            oldTasks.push(row);
        });


        query.on('end', function () {
            client.end();
            return response.json(oldTasks);
        });
    });
});

module.exports = router;