const { v4: uuidv4 } = require('uuid');

class Team {
    constructor(teamName, players) {
        this.id = uuidv4();
        this.teamName = teamName;
        this.players = players;
    }

    removePlayerFromTeam(player) {
        if (!player) return;
            const playerIndex = this.players.findIndex((teamPlayer) => teamPlayer.id === player.id);
        
            if (playerIndex === -1) {
                throw new Error("Player not in the given team.")
            }
            
            this.players.splice(playerIndex, 1);
    }
}

module.exports = Team;
