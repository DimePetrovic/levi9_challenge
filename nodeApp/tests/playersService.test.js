const PlayerService = require('../services/players');
const Player = require('../models/player');

describe('Players Service', () => {
  
  test('after creating two users getAllPlayers should return array of two players', () => {
    const player1 = PlayerService.createPlayer("p1");
    const player2 = PlayerService.createPlayer("p2");

    const players = PlayerService.getAllPlayers();
    expect(players.length).toBe(2);
  });  

  test('creating player and calling getPlayerById with id of new player should return the same player', () => {
    const player1 = PlayerService.createPlayer("p3");
    const player2 = PlayerService.getPlayerById(player1.id);

    expect(player1 === player2).toBe(true);
  });  

  test('should create a player with a valid nickname', () => {
    const nickname = 'player1';

    const newPlayer = PlayerService.createPlayer(nickname);

    expect(newPlayer).toBeInstanceOf(Player);
    expect(newPlayer.nickname).toBe(nickname);
    expect(newPlayer.id).toBeDefined();
  });

  test('should throw an error when nickname is not provided', () => {
    expect(() => {
      PlayerService.createPlayer();
    }).toThrow('Player nickname is required.');
  });

  test('should throw an error when a player with the same nickname already exists', () => {
    const nickname = 'player2';
    PlayerService.createPlayer(nickname); 
    expect(() => {
      PlayerService.createPlayer(nickname);
    }).toThrow('Player with the same nickname already exists.');
  });
});
