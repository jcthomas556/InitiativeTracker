function loadRoster(req, res){
    
    //console.log(req.body.fname);
    // var object = req.query.player_choice;
    // var weight = req.query.username;
   
    // var cost = calculateCost(object, weight);
    // var costReport = {cost: cost}; // send it in a JSON object
     res.render('rosterView');
}



module.exports = {loadRoster: loadRoster};