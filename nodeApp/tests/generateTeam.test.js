const PlayerService = require('../services/players');
const Player = require('../models/player');
const TeamsService = require('../services/teams');
const Team = require('../models/team');

describe('Matchmaking Service', () => {
  
  test('test generating a team', () => {
    const player1 = PlayerService.createPlayer("u1");
    const player2 = PlayerService.createPlayer("u2");
    const player3 = PlayerService.createPlayer("u3");
    const player4 = PlayerService.createPlayer("u4");
   
    
    const player11 = PlayerService.createPlayer("u11");
    const player22 = PlayerService.createPlayer("u22");
    const player33 = PlayerService.createPlayer("u33");
    const player44 = PlayerService.createPlayer("u44");
   

    const ids1 = [player1.nickname, player2.nickname, player3.nickname, player4.nickname]
    const ids2 = [player11.nickname, player22.nickname, player33.nickname, player44.nickname];
    const players = [...ids1, ...ids2];
    const result = TeamsService.draftTeams(players)
    console.error({result})
  });  


  
  
});
