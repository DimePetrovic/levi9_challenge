const TeamsService = require('../services/teams');
const PlayerService  =require("../services/players");
const Team = require('../models/team');

// POST /teams
function createTeam(req, res) {
    const { teamName, players } = req.body;
    let teamSize = req.query.teamSize;
    try {
        if (!teamSize){
            teamSize = 5
        }
        const newTeam = TeamsService.createTeam(teamName, players, teamSize);
        res.status(200).json(newTeam);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// GET /teams
function getTeams(req, res) {
    const teams = TeamsService.getAllTeams();
    res.json(teams);
}

// GET /teams/:id
function getTeamById(req, res) {
    const { id } = req.params;

    const team = TeamsService.getTeamById(id);
    if (!team) {
        return res.status(404).json({ error: 'Team not found.' });
    }

    res.json(team);
}


// PUT /teams/generate_teams?teamSize=n
function generateTeams(req,res){
    const size = req.query.teamSize;
    // const name1 = req.body.players[0].teamName
    // const name2 = req.body.players[1].teamName
    console.log({size})
    try{
        const teams = TeamsService.generateTeams(size);
        console.log(teams)
        res.status(200).json(teams)

    }catch(error){
        res.status(500).json(error)
    }
    
}
module.exports = {
    createTeam,
    getTeams,
    getTeamById,
    generateTeams
};
