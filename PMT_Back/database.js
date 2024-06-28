const mysql = require('mysql2');

// Create a pool 
const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  database: 'pmt',
  password: '',
  waitForConnections: true,
  // connectionLimit: 10, // Adjust this based on your needs
  // // queueLimit: 0
});

// Test the database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Database connected successfully!');
    connection.release(); // Release the connection
  }
});

module.exports = pool.promise(); // Export the connection pool

