const PlayersService = require('../services/players');
const TeamsService = require('../services/teams');

describe('Leave team', () => { 
    test('trying to leave team', () => {
        const player1 = PlayersService.createPlayer("u1");
        const player2 = PlayersService.createPlayer("u2");
        const player3 = PlayersService.createPlayer("u4");
      
        const ids1 = [player1.id, player2.id, player3.id];
      
        const team1 = TeamsService.createTeam("t1", ids1, 3);
 
        expect(player2.teamId).toBe(team1.id);

        expect(team1.players.length).toBe(3);

        PlayersService.leaveTeam(player2);
        team1.removePlayerFromTeam(player2);

        expect(player2.teamId).toBe(null);
        
        expect(team1.players.length).toBe(2);
    })
})
