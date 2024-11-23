const PlayersService = require('../services/players');

// POST /players/create
function createPlayer(req, res) {
    const { nickname } = req.body;

    try {
        const newPlayer = PlayersService.createPlayer(nickname);
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
    console.log("Hej");
    const id = req.params.player_id;
    const player = PlayersService.getPlayerById(id);

    try {
        const updatedPlayer = PlayersService.leaveTeam(player);
        res.status(200).json(updatedPlayer);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayer,
    leaveTeam
};
