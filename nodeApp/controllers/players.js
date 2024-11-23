const PlayersService = require('../services/players');
const TeamsService = require('../services/teams');

// POST /players/create
function createPlayer(req, res) {
    const { nickname } = req.body;
    console.log(request);
    try {
        const newPlayer = PlayersService.createPlayer(nickname);
        console.log("new player from controller: ", newPlayer)
        res.status(200).json(newPlayer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET /players
function getAllPlayers(req, res) {
    const players = PlayersService.getAllPlayers();
    res.status(200).json(players);
}

// GET /players/:id
function getPlayer(req, res) {
    const { id } = req.params;
    const newPlayer = PlayersService.getPlayerById(id);

    if(newPlayer){
        res.json(newPlayer);
    } 
    else {
        res.status(404).json("Player not found");
    }
}

// PUT /players/:id/leave_team
function leaveTeam(req, res){
    const id = req.params.player_id;
    const player = PlayersService.getPlayerById(id);

    const oldTeam = player.teamId ? TeamsService.getTeamById(player.teamId) : null;

    try {
        const updatedPlayer = PlayersService.leaveTeam(player);
        if(oldTeam){
            oldTeam.removePlayerFromTeam(player);
        }
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// DELETE /players
function deletePlayers(req,res){
    try {
       if( !PlayersService.deletePlayers() || !TeamsService.deleteTeams()){
        res.status(500).json({error:"could not delete players"})
        return
    }
    res.status(200).json({message: "players deleted successfully"})
      return
    } catch (error) {
       console.error(error) 
    }
}
module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayer,
    leaveTeam,
    deletePlayers
};
