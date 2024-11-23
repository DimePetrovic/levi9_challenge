const PlayerService = require('../services/players');
const Player = require('../models/player');
const TeamsService = require('../services/teams');
const Team = require('../models/team');

describe('Team Service', () => {
  
  test('creating a team with valid data should return instance of Team', () => {
    const player1 = PlayerService.createPlayer("t1");
    const player2 = PlayerService.createPlayer("t2");
    const player3 = PlayerService.createPlayer("t3");
    const player4 = PlayerService.createPlayer("t4");
    const player5 = PlayerService.createPlayer("t5");
    
    const ids = [player1.id, player2.id, player3.id, player4.id, player5.id]
    const team = TeamsService.createTeam("team1", ids);

    expect(team).toBeInstanceOf(Team);
    expect(team.teamName).toBe("team1");
    expect(team.id).toBeDefined();
  });  

  test('trying to create team without enough players', () => {
    const player1 = PlayerService.createPlayer("y1");
    const player2 = PlayerService.createPlayer("y2");
    const player3 = PlayerService.createPlayer("y3");
    const player4 = PlayerService.createPlayer("y4");
    
    const ids = [player1.id, player2.id, player3.id, player4.id];
    expect(() => {
        TeamsService.createTeam("team2", ids)
    }).toThrow('Name and exactly 5 players are required.');
  });  

  test('trying to create two teams with the same name', () => {
    const player1 = PlayerService.createPlayer("u1");
    const player2 = PlayerService.createPlayer("u2");
    const player3 = PlayerService.createPlayer("u3");
    const player4 = PlayerService.createPlayer("u4");
    const player5 = PlayerService.createPlayer("u5");
    
    const player11 = PlayerService.createPlayer("u11");
    const player22 = PlayerService.createPlayer("u22");
    const player33 = PlayerService.createPlayer("u33");
    const player44 = PlayerService.createPlayer("u44");
    const player55 = PlayerService.createPlayer("u55");

    const ids1 = [player1.id, player2.id, player3.id, player4.id, player5.id];
    const ids2 = [player11.id, player22.id, player33.id, player44.id, player55.id];
    expect(() => {
        TeamsService.createTeam("team4", ids1);
        TeamsService.createTeam("team4", ids2);
    }).toThrow('Team with the same team name already exists.');
  });  
});
