const express = require('express');
const bodyParser = require('body-parser');

const playersController = require('./controllers/players');
const teamsController = require('./controllers/teams');
const matchesController = require('./controllers/matches');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

// Players endpoints
app.post('/players/create', playersController.createPlayer);
app.get('/players', playersController.getAllPlayers);
app.get('/players/:id', playersController.getPlayer);
app.delete("/players",playersController.deletePlayers)

// Teams endpoints
app.post('/teams', teamsController.createTeam);
app.get('/teams/:id', teamsController.getTeamById);

// Matches endpoints
app.post('/matches', matchesController.createMatch);

app.listen(PORT, () => {
    console.log(`Server radi na http://localhost:${PORT}`);
});
