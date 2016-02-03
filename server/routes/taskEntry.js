var express = require("express");
var router = express.Router();
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

router.post('/addTasks', function (request, response) {

    var tasks = [];
    var data = request.body;

    pg.connect(connectionString, function (error, client) {

        if (error) {
            console.log(error);
        }

        var query = client.query("INSERT INTO tasks (column name, column name, column name) VALUES($1, $2, $3)", [taskname, userid]);

        query.on('row', function (row) {
            results.push(row);
        });

    })

});


