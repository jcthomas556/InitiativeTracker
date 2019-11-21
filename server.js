const express = require('express');//install this with npm install express in the terminal, also instal ejs
var app = express();
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL || 'postgres://rsmhlcvwmrbznt:fca674e938383ee27c1e601e38264bfe378d950111d4fa6e0622ed54ae604d72@ec2-174-129-203-86.compute-1.amazonaws.com:5432/d5no66ko5da4s0?ssl=true'})

app.set('port', process.env.PORT || 5000)
    .use(express.static(__dirname + '/public'))//this lets me put files in the public folder that are acceable globally
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .get('/getPerson', function(req, res){
        pool.query('SELECT * FROM person WHERE id = $1', [req.query.id], function(err, result) {
            if (err) {
                console.log("Error in query: ")
                console.log(err);
            }
            console.log("Back from DB with result:");
            console.log(result.rows);
        })
    })
    .listen(app.get('port'), function(){
        console.log('Listening on port: ' + app.get('port'));
    })