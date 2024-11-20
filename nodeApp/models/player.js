const { v4: uuidv4 } = require('uuid');

class Player {
    constructor(nickname) {
        this.id = uuidv4();
        this.nickname = nickname;
        this.wins = 0,
        this.losses = 0,
        this.elo = 0,
        this.hoursPlayed = 0,
        this.teamId = null,
        this.ratingAdjustment = null
    }

    updatePlayerTeam(teamId) {
        this.teamId = teamId;
        this.updateRatingAdjustment();
    }

    updateRatingAdjustment() {
        const ranges = [
            { min: 0, max: 499, k: 50 },
            { min: 500, max: 999, k: 40 },
            { min: 1000, max: 2999, k: 30 },
            { min: 3000, max: 4999, k: 20 },
            { min: 5000, max: Infinity, k: 10 },
          ];

          this.ratingAdjustment = ranges.find(range => 
            this.hoursPlayed >= range.min && this.hoursPlayed <= range.max
          )?.k || 0; 
    }

    updatePlayer(S, R2, duration) {
        const E = 1 / (1 + Math.pow(10, (this.elo - R2)/400));
        const RNew = this.elo + this.ratingAdjustment * (S - E);

        this.elo = RNew;
        this.hoursPlayed += duration;
        this.updateRatingAdjustment();
    }
}

module.exports = Player;
