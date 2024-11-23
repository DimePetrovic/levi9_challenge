const PlayersService = require('../services/players');
const TeamsService = require('../services/teams');
const MatchesService = require('../services/matches');

describe('Create match', () => { 
    test('trying to create match', () => {
        const player1 = PlayersService.createPlayer("u1");
        const player2 = PlayersService.createPlayer("u2");
        const player3 = PlayersService.createPlayer("u3");
        const player4 = PlayersService.createPlayer("u4");
        const player5 = PlayersService.createPlayer("u5");
        const player6 = PlayersService.createPlayer("u6");
      
        const teams = TeamsService.generateTeams(3);
        const team1 = teams[0];
        const team2 = teams[1];

        console.log(team1.id, team2.id);

        expect(player1.teamId).toBe(team1.id);

        MatchesService.createMatch({team1Id: team1.id, team2Id: team2.id, winningTeamId: team1.id, duration: 60});
        
        expect(player1.teamId).toBe(null);
    });
})