require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    databade: process.env.DB_NAME
}).promise();

