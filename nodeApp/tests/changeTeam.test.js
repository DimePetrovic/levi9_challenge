const PlayersService = require('../services/players');
const TeamsService = require('../services/teams');

describe('Change Team', () => { 
    test('trying to change players team', () => {
        const player1 = PlayersService.createPlayer("u1");
        const player2 = PlayersService.createPlayer("u2");
        const player3 = PlayersService.createPlayer("u4");
      
        const ids1 = [player1.id, player2.id];
        const ids2 = [player2.id, player3.id];
      
        const team1 = TeamsService.createTeam("t1", ids1, 2);
        const team2 = TeamsService.createTeam("t2", ids2, 2);
    
        expect(player2.teamId).toBe(team2.id)
        expect(team1.players.length).toBe(1)
        expect(team2.players.length).toBe(2)
        
    })
})
