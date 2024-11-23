const mysql = require('mysql2');
const HOST = "pet-dana-u-oblacima.czyosekmm8je.eu-central-1.rds.amazonaws.com"
const USERNAME = "user"
const PASSWORD = "owerwatch"
const DATABASE = "5-dana-u-oblacima"
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
  
module.exports = connection;
