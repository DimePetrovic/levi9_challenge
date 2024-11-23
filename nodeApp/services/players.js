const Player = require('../models/player');
const players = [];
const db = require('../db/db'); // import the db connection
const {v4:uuidv4} = require('uuid')
function createPlayer(nickname, callback) {
    const id = uuidv4();  // Generate a unique ID for the player
    const query = 'INSERT INTO players (id, nickname) VALUES (?, ?)';
    
    db.query(query, [id, nickname], (err, results) => {
        if (err) {
            console.error('Error inserting player:', err);
            return callback(err, null);
        }
        
        // Return the player object with default values and the id
        const player = {
            id,
            nickname,  // Passed nickname from the request
            wins: 0,
            losses: 0,
            elo: 0,
            hoursPlayed: 0,
            ratingAdjustment: null,
            teamId: null
        };

        // Return the player data through the callback
        callback(null, player);
    });
}

function getAllPlayers(callback) {
    db.query('SELECT * FROM players', (err, results) => {
        if (err) {
        console.error('Error fetching users:', err);
        return callback(err, null);
        }
        callback(null, results);
    });
}

function getPlayerById(id, callback) {
    // Generate a unique ID for the player
    const query = 'SELECT * FROM players WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error inserting player:', id,err);
            return callback(err, null);
        }
        
        

        // Return the player data through the callback
        callback(null, results);
    });
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

    if (!playersToUpdate || !Array.isArray(playersToUpdate)) {
        throw new Error('Players to update must be an array of players.');
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

function deletePlayers(callback){
    db.query(`TRUNCATE TABLE players;TRUNCATE TABLE matches;TRUNCATE TABLE teams;`, (err, results) => {
        if (err) {
        console.error('Error deleting data:', err);
         return callback(err, null);
        }
         callback(null, results);
    });
  
}
function leaveTeam(player,callback){
    const id  = player.id
    const query = 'UPDATE players SET teamId = NULL WHERE id = ?;';
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error leaving team for player with ID:', id, err);
            return callback(err, null); // Pass the error to the callback
        }
        // Return the results through the callback
        callback(null, results); // Pass the results to the callback
    });
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
