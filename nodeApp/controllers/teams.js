const TeamsService = require('../services/teams');

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

module.exports = {
    createTeam,
    getTeams,
    getTeamById,
};
