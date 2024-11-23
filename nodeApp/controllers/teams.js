const TeamsService = require('../services/teams');
const PlayerService  =require("../services/players");
const Team = require('../models/team');

// POST /teams
function createTeam(req, res) {
    const { teamName, players } = req.body;
    const teamSize = req.query.teamSize;
    try {
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
    const {teamSize} = req.query;
    const team1 = [];
    const team2 = [];
    const players = TeamsService.getPlayersWithoutTeam();

    for (let i = 0; i < teamSize; i++) {
        team1.push(players[i]);
        team2.push(players[i+1])
    }
    TeamsService.createTeam(team1);
    TeamsService.createTeam(team1)
}
module.exports = {
    createTeam,
    getTeams,
    getTeamById,
};
