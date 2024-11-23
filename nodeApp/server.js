const express = require('express');
const bodyParser = require('body-parser');

const playersController = require('./controllers/players');
const teamsController = require('./controllers/teams');
const matchesController = require('./controllers/matches');
const headers = require('./middleware/headers');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(headers)
// Players endpoints
app.post('/players/create', playersController.createPlayer);
app.get('/players', playersController.getAllPlayers);
app.get('/players/:id', playersController.getPlayer);
app.put('/players/:player_id/leave_team', playersController.leaveTeam);
app.delete("/players",playersController.deletePlayers)

// Teams endpoints
app.post('/teams', teamsController.createTeam);
app.get('/teams/:id', teamsController.getTeamById);
app.post('/teams/generate_teams', teamsController.generateTeams);


// Matches endpoints
app.post('/matches', matchesController.createMatch);

app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});
