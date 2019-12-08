function loadRoster(req, res){

    const query = {
        text: 'Select * FROM player_characters'
    }
    pool.query(query, function(err, result) {
        if (err) {
            console.log("Error in query: ")
            console.log(err);
            //TODO send the user to an error page with some links and other info
        }
        console.log(result);
        //res.redirect('/newCharacter.html');
        
    })


    
    //console.log(req.body.fname);
    // var object = req.query.player_choice;
    // var weight = req.query.username;
   
    // var cost = calculateCost(object, weight);
    // var costReport = {cost: cost}; // send it in a JSON object
     res.render('rosterView');
}



module.exports = {loadRoster: loadRoster};