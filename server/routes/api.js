var express = require('express');
var pg = require('pg');
var router = express.Router();
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';


router.post('/addTasks', function (request, response) {

    var tasks = [];
    var data = request.body;

    pg.connect(connectionString, function (error, client) {

        if (error) {
            console.log(error);
        }

        client.query("INSERT INTO tasks (column name, column name, column name) VALUES($1, $2, $3)", [data.userid, data.tasks]);

        var query = client.query("SELECT * FROM skills ORDER BY id ASC");

        query.on('row', function (row) {
            results.push(row);
        });

        query.on('end', function () {
            client.end();
            return response.json(results);
        });

    })

});

