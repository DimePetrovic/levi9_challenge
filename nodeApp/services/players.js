const Player = require('../models/player');
const players = [];

function createPlayer(nickname) {
    if (!nickname) {
        throw new Error('Player nickname is required.');
    }
    console.log({nickname})
    const existingPlayer = players.find((player) => player.nickname === nickname);
    if (existingPlayer) {
        throw new Error('Player with the same nickname already exists.');
    }

    const newPlayer = new Player(nickname);
    console.log({newPlayer})
    players.push(newPlayer);
    return newPlayer;
}

function getAllPlayers() {
    return players;
}

function getPlayerById(id) {
    return players.find((p) => p.id == id);
}

function getPlayersByIds(ids) {
    if (!Array.isArray(ids)) {
        throw new Error('IDs must be an array.');
    }

    const foundPlayers = ids.map((id) => {
        const player = players.find((player) => player.id === id);
        if (!player) {
            throw new Error(`Player with ID ${id} not found.`);
        }
        if (player.team != null) {
            throw new Error(`Player with nickname ${player.nickname} already has a team.`);
        }
        return player;
    });

    return foundPlayers;
}

function updatePlayers(playersToUpdate, S, R2, duration) {
    if (![0, 0.5, 1].includes(S)) {
        throw new Error('Invalid value for S. Allowed values are 0, 0.5, and 1.');
    }

    if (!playersToUpdate || !Array.isArray(playersToUpdate) || playersToUpdate.length !== 5) {
        throw new Error('Players to update must contain exactly 5 players.');
    }

    const updatedPlayers = playersToUpdate.map((player) => {
        const existingPlayer = getPlayerById(player.id);

        if (!existingPlayer) {
            throw new Error(`Player with ID ${player.id} does not exist.`);
        }

        existingPlayer.updatePlayer(S, R2, duration);

        return existingPlayer;
    });

    return updatedPlayers;
}

function deletePlayers(){
    while(players.length){
        players.pop();
    }
    if( players.length !==0){
        return false;
    } else{
        return true
    }
}

function leaveTeam(player){
    if (player.teamId == null){
        throw new Error('Player does not have a team');
    }
    
    player.updatePlayerTeam(null);
    return player;
}

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    getPlayersByIds,
    updatePlayers,
    leaveTeam,
    deletePlayers
}
