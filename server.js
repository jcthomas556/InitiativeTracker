const express = require('express');//install this with npm install express in the terminal, also instal ejs
var app = express();
var bodyParser = require('body-parser');
var rosterPage = require('./rosterPage.js');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const {Pool} = require('pg');
const pool = new Pool({connectionString: process.env.DATABASE_URL || 'postgres://ntwzgxxvnkywoq:ce7468ac2b9ce2c01e407f70d620eac576ac4aa059507db9262fae872ed5932f@ec2-174-129-229-162.compute-1.amazonaws.com:5432/dfb7aff5tskn4d?ssl=true'})

app.set('port', process.env.PORT || 5000)
    .use(express.static(__dirname + '/public'))//this lets me put files in the public folder that are acceable globally
    .use(bodyParser.urlencoded({ extended: true })) 
    .set('views', __dirname + '/views')
    .set('view engine', 'ejs')
    .get('/', function(req, res){
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
    .get('/roster', rosterPage.loadRoster)
    .post('/submitPC', function(req, res){
        console.log('req.body.fname');
        console.log(req.body.fname);
        const query = {
            text: 'INSERT INTO player_characters (player_fname, player_lname, player_ac, player_init_bonus, player_race, player_class) VALUES($1, $2, $3, $4, $5, $6)',
            values: [req.body.fname, req.body.lname, req.body.player_ac, req.body.init_bonus, req.body.race, req.body.class],
        }
        pool.query(query, function(err, result) {
            if (err) {
                console.log("Error in query: ")
                console.log(err);
                //TODO send the user to an error page with some links and other info
            }
            res.redirect('/newCharacter.html');
            
        })

 

    })
    .post('/submitNPC', function(req, res){
        console.log('req.body.fname');
        console.log(req.body.fname);
        const query = {
            text: 'INSERT INTO npc_characters (npc_fname, npc_lname, npc_ac, npc_init_bonus, npc_race_type) VALUES($1, $2, $3, $4, $5)',
            values: [req.body.fname, req.body.lname, req.body.npc_ac, req.body.init_bonus, req.body.classification],
        }
        pool.query(query, function(err, result) {
            if (err) {
                console.log("Error in query: ")
                console.log(err);
                //TODO send the user to an error page with some links and other info
            }
            res.redirect('/newNpc.html');
            
        })
    })
    .listen(app.get('port'), function(){
        console.log('Listening on port: ' + app.get('port'));
    })