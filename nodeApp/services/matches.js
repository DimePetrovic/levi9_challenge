const TeamsService = require('./teams');

function createMatch({ team1Id, team2Id, winningTeamId, duration }) {
    if (!team1Id || !team2Id) {
        throw new Error('Both team1Id and team2Id are required.');
    }

    const team1 = TeamsService.getTeamById(team1Id);
    const team2 = TeamsService.getTeamById(team2Id);

    if (!team1 || !team2) {
        throw new Error('One or both teams do not exist.');
    }

    if (team1.id == team2.id) {
        throw new Error('Match between same teems are not allowed');
    } 

    if (team1.players.length != team2.players.length) {
        throw new Error('Both teams must be with the same number of players');
    }

    if (team1.players.length < 1) {
        throw new Error('Teams must have minimum 1 player');
    }

    if (!Number.isInteger(duration) || duration < 1) {
        throw new Error('Duration must be an integer greater than or equal to 1.');
    }

    if (winningTeamId && winningTeamId !== team1Id && winningTeamId !== team2Id) {
        throw new Error('Winning team ID must match either team1Id or team2Id.');
    }

    const team1ELO = TeamsService.getTeamAverageEloValue(team1);
    const team2ELO = TeamsService.getTeamAverageEloValue(team2);

    if (winningTeamId) {
        if(team1.id == winningTeamId) {
            TeamsService.updateTeamPlayers(team1, 1, team2ELO, duration);
            TeamsService.updateTeamPlayers(team2, 0, team1ELO, duration);
        }   
        else {
            TeamsService.updateTeamPlayers(team1, 0, team2ELO, duration);
            TeamsService.updateTeamPlayers(team2, 1, team1ELO, duration);
        } 
    }
    else {
        TeamsService.updateTeamPlayers(team1, 0.5, team2ELO, duration);
        TeamsService.updateTeamPlayers(team2, 0.5, team1ELO, duration);
    }
}

module.exports = {
    createMatch
};
