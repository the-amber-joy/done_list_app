var express = require('express');
var router = express.Router();
var passport = require('passport');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/done_list_app';

///////////////////////////////////////////////////////////////////////////////////
//                Let's try posting something to the database...
///////////////////////////////////////////////////////////////////////////////////



router.post('/', function(request, response) {

    //console.log('request.user is:', request.user);
    //console.log('full request returns:', request);
    console.log('request.body returns this:', request.body);

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors

        if(err) {
            done();
            console.log(err);
            return response.status(500).json({ success: false, data: err});
        }


            // LOOPING SQL Query > Insert Data
        //for (i = 0; i < taskList.length; i++){
        //    client.query("INSERT INTO tasks (task_name, user_id) VALUES ($1, $2); INSERT INTO task_dates (date, task_id) VALUES ('today', (SELECT id FROM tasks ORDER BY id DESC LIMIT 1));", [taskList[i], userId]);
        //}
    });
});


/////////USE THIS STUFF TO GENERATE THE CHECKLIST ITEMS AND THE HISTORY
// SQL Query > Select Data
//QUERY TO FIND ALL OF A USER'S TASKS FOR CHECKLIST:
//var query = client.query("SELECT * FROM tasks JOIN users ON users.id = tasks.user_id WHERE users.username = $1", [response.data.username]);
//
//// Stream results back one row at a time
//query.on('row', function(row) {
//    results.push(row);
//});
//
//// After all data is returned, close connection and return results
//query.on('end', function() {
//    done();
//    return response.json(results);
//});

///////////////////////////////////////////////////////////////////////////////////
//                       DB POST TEST END
///////////////////////////////////////////////////////////////////////////////////


module.exports = router;