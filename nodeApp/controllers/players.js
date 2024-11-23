const PlayersService = require('../services/players');
const TeamsService = require('../services/teams');

// POST /players/create
function createPlayer(req, res) {
    const {nickname} = req.body;
    PlayersService.createPlayer(nickname,(err,player)=>{
        if (err) {
            // Log the error and send a 500 status response
            console.error('Error creating player:', err);
            return res.status(500).json({ message: 'Error creating players' });
          }
      
          // Send a successful response with the users data
          return res.status(200).json(player);
    });
}

// GET /players
function getAllPlayers(req, res) {
    PlayersService.getAllPlayers((err,players)=>{
        if (err) {
            // Log the error and send a 500 status response
            console.error('Error fetching users:', err);
            return res.status(500).json({ message: 'Error fetching users' });
          }
      
          // Send a successful response with the users data
          return res.status(200).json(players);
    });
    
}

// GET /players/:id
function getPlayer(req, res) {
    const {id} = req.body;
    PlayersService.getPlayerById(id,(err,player)=>{
        if (err) {
            // Log the error and send a 500 status response
            console.error('Error creating player:', err);
            return res.status(500).json({ message: 'Error creating players' });
          }
      
          // Send a successful response with the users data
          return res.status(200).json(player);
    });
}

// PUT /players/:id/leave_team
function leaveTeam(req, res){
    const id = req.params.player_id;
    PlayersService.leaveTeam(id,(err,player)=>{
        if (err) {
            // Log the error and send a 500 status response
            console.error('Error creating player:', err);
           return res.status(400).json({error: error.message});
        }
         return res.status(200).json(player);
    });
  
}

// DELETE /players
function deletePlayers(req,res){
    PlayersService.deletePlayers((err,player)=>{
        if (err) {
            // Log the error and send a 500 status response
            console.error('Error creating player:', err);
            return res.status(400).json({error: error.message});
          }
          return res.status(200).json(player);
    });
}
module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayer,
    leaveTeam,
    deletePlayers
};
