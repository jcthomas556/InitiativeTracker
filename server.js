const express = require('express');//install this with npm install express in the terminal, also instal ejs
var app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL || 'postgres://ntwzgxxvnkywoq:ce7468ac2b9ce2c01e407f70d620eac576ac4aa059507db9262fae872ed5932f@ec2-174-129-229-162.compute-1.amazonaws.com:5432/dfb7aff5tskn4d?ssl=true'})

app.set('port', process.env.PORT || 5000)
    .use(express.static(__dirname + '/public'))//this lets me put files in the public folder that are acceable globally
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .get('/', function(req, res){
        console.log('success');
        res.sendFile('home.html', { root: __dirname + "/public"})
        // pool.query('SELECT * FROM player_characters', function(err, result) {
        //     if (err) {
        //         console.log("Error in query: ")
        //         console.log(err);
        //     }
        //     console.log("Back from DB with result:");
        //     console.log(result.rows);
        //     res.send(result.rows);
        // })
    })
    .listen(app.get('port'), function(){
        console.log('Listening on port: ' + app.get('port'));
    })