var express = require("express");
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

router.post('/', function (request, response) {

    var tasks = [];
    var data = request.body;

    pg.connect(connectionString, function (error, client) {

        if (error) {
            console.log(error);
        }

        //THIS IS WHERE I LEFT OFF
        //var query = client.query('INSERT INTO tasks (task_name, user_id) VALUES($1, $2)', [WHAT IS THE taskname?, CURRENT LOGGED IN USER_ID?]);
        //ADD TO QUERY: 'INSERT INTO task_dates (date, task_id) VALUES (current_date, $1)', [WHAT IS THE CURRENT LOGGED IN USER_ID]);

        query.on('row', function (row) {
            results.push(row);
        });

    })

});

///////////////////////////////////////////////////////////////////////////////////
//                Let's try posting something to the database...
///////////////////////////////////////////////////////////////////////////////////
router.post('/', function(request, response) {

    $scope.taskList = [];
    for (i = 0; i < $scope.taskList.length; i++){
//START WRITING THIS CRAP
    }


    var results = [];

    // Grab data from http request
    var data = {text: request.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
            done();
            console.log(err);
            return response.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return response.json(results);
        });
    });
});
///////////////////////////////////////////////////////////////////////////////////
//                       DB POST TEST END
///////////////////////////////////////////////////////////////////////////////////


module.exports = router;