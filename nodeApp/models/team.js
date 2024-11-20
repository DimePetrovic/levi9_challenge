const { v4: uuidv4 } = require('uuid');

class Team {
    constructor(teamName, players) {
        this.id = uuidv4();
        this.teamName = teamName;
        this.players = players;
    }
}

module.exports = Team;
