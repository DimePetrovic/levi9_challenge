const mysql = require('mysql2');
const HOST = "database-1.czyosekmm8je.eu-central-1.rds.amazonaws.com"
const USERNAME = "user"
const PASSWORD = "overwatch"
const DATABASE = "db"
const PORT = 3306

const connection = mysql.createConnection({
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: DATABASE,
    port: PORT
})


connection.connect(err => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to MySQL database');
  });
  

  // SQL queries to create the tables
const createPlayersQuery = `
CREATE TABLE IF NOT EXISTS players (
  id VARCHAR(255) PRIMARY KEY, -- Change from TEXT to VARCHAR
  nickname VARCHAR(255) NOT NULL,
  wins INT DEFAULT 0,
  losses INT DEFAULT 0,
  elo INT DEFAULT 0,
  hoursPlayed INT DEFAULT 0,
  ratingAdjustment INT DEFAULT NULL,
  teamId VARCHAR(255) DEFAULT NULL, -- Change from TEXT to VARCHAR
  FOREIGN KEY (teamId) REFERENCES teams(id)
);
`;
const createTeamsQuery = `
CREATE TABLE IF NOT EXISTS teams (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255)
);`
const createMatchesQuery = `
CREATE TABLE IF NOT EXISTS matches (
  id VARCHAR(255) PRIMARY KEY, -- Change from TEXT to VARCHAR
  team1Id VARCHAR(255),
  team2Id VARCHAR(255),
  winningTeamId VARCHAR(255) DEFAULT NULL,
  duration INT DEFAULT 0,
  FOREIGN KEY (team1Id) REFERENCES teams(id),
  FOREIGN KEY (team2Id) REFERENCES teams(id),
  FOREIGN KEY (winningTeamId) REFERENCES teams(id)
);
`;

// Function to create the tables
const createTables = () => {
  connection.query(createTeamsQuery, (err, result) => {
    if (err) {
      console.error('Error creating matches table:', err.stack);
      return;
    }
    console.log('Matches table created or already exists');
  });
// Execute the queries in order
connection.query(createPlayersQuery, (err, result) => {
  if (err) {
    console.error('Error creating players table:', err.stack);
    return;
  }
  console.log('Players table created or already exists');
});

connection.query(createMatchesQuery, (err, result) => {
  if (err) {
    console.error('Error creating matches table:', err.stack);
    return;
  }
  console.log('Matches table created or already exists');
});

};

// Call the function to create tables
createTables();
module.exports = connection;
