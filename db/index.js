require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create the connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME
}).promise();

// Exporting the database connection to be used in other parts of the application 
module.exports = db;