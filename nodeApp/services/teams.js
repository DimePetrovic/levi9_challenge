const { v4: uuidv4 } = require('uuid');
const PlayersService = require('./players');
const Team = require('../models/team');

const teams = [];

function createTeam(teamName, playerIds, teamSize) {
    if (!teamName || teamSize < 1 || playerIds.length != teamSize) {
        throw new Error(`Name and exactly ${teamSize} players are required.`);
    }

    const existingTeam = teams.find((team) => team.teamName === teamName);
    if (existingTeam) {
        throw new Error('Team with the same team name already exists.');
    }

    const players = PlayersService.getPlayersByIds(playerIds);
    const newTeam = new Team(teamName, players);

    newTeam.players.forEach(player => {
        assignPlayerToTeam(player, newTeam.id);
    });

    teams.push(newTeam);
    return newTeam;
}


function assignPlayerToTeam(player, teamId) {
    if(!player || !teamId) {
        throw new Error('Player and teamId are mandatory.');
    }

    if(player.teamId) {
        const team = getTeamById(player.teamId)
        team.removePlayerFromTeam(player)
    }

    player.updatePlayerTeam(teamId);
}

function getAllTeams() {
    return teams;
}

function getTeamById(teamId) {
    return teams.find((team) => team.id === teamId);
}

function updateTeamPlayers(team, S, R2, duration){
    const updatedPlayers = PlayersService.updatePlayers(team.players, S, R2, duration);
    team.players = updatedPlayers;
}

function getTeamAverageEloValue(team){
    const totalElo = team.players.reduce((sum, player) => sum + player.elo, 0);
    const averageElo = totalElo / team.players.length;

    return averageElo;
}

function getPlayerIdsWithoutTeam(){
    const allPlayers = PlayersService.getAllPlayers();
    allPlayers.filter(p=>p.teamId === null)
    .sort((a, b) => b.elo - a.elo)
    .map(p => p.id);
    return playerIds

}

function generateTeams(size, name1,name2){

    const team1Ids = [];
    const team2Ids = [];
    const playersWithoutTeam = TeamsService.getPlayerIdsWithoutTeam();

    for (let i = 0; i < size; i++) {
        team1Ids.push(playersWithoutTeam[i]);
        team2Ids.push(playersWithoutTeam[i+1])
        console.log({team1Ids,team2Ids})
    }
    try{
        const team1 = createTeam(name1,team1Ids,size);
        const team2 = createTeam(name2,team1Ids,size);
        return [team1,team2];
    } catch(error){
        console.error(error)
    }


}

module.exports = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeamPlayers,
    getTeamAverageEloValue,
    generateTeams
};
