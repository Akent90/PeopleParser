require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    databade: process.env.DB_NAME
}).promise();

const mainMenu = async () => {
    try {
        const { action } = await inquirer.prompt([
           {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?', 
            choices: [
                'View all departments',
                'View all roles', 
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ],
           }, 
        ]);

        switch (action) {
            case 'View all departments':
                await viewAllDepartments();
                break;
            case 'View all roles':
                await viewAllRoles();
                break;
            case 'View all employees':
                await viewAllEmployees();
                break;
            case 'Add a department':
                await addDepartment();
                break;
            case 'Add a role':
                await addRole();
                break;
            case 'Add an employee':
                await addEmployee();
                break;
            case 'Exit':
            db.end();
            console.log('Goodbye!');
            process.exit();
        }
    }
}