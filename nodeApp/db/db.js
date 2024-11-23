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
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});
 
// Execute a query
const sendQuery = async (queryString) => {
    try {
        // Use the promise-based API of the connection
        const [results] = await connection.promise().query(queryString);
        console.log(results); // Print the query results
        return results;
    } catch (err) {
        console.error('Error executing query:', err.stack);
        throw err; // Rethrow the error for handling upstream
    }
};

// Export the sendQuery function for use in other modules
module.exports = sendQuery;
