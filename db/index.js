require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create the connection to the database 
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME
}).promise();

module.exports = db;