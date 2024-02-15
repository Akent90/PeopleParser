const inquirer = require('inquirer');
const db = require('../db');

async function viewAllDepartments() {
    try {
        const [rows] = await db.query('SELECT * FROM department');
        console.table(rows);
    } catch (err) {
        console.error(err);
    }
}

async function addDepartment() {
    const { departmentName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
        }
    ]);

    try {
        await db.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
        console.log(`Added ${departmentName} to the database`);
    } catch (err) {
        console.error(err);
    }
}

module.exports = { viewAllDepartments, addDepartment };