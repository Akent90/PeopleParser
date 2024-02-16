// Import necessary modules
const inquirer = require('inquirer');
const db = require('../db');

// Function to add a new department
async function viewAllDepartments() {
    try {
        const [rows] = await db.query('SELECT * FROM department');
        // Displaying the results in a table format 
        console.table(rows);
    } catch (err) {
        console.error(err);
    }
}

// Function to add a new department
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

// Function to retrieve all departments from the database
async function getDepartments() {
    const [rows] = await db.query('SELECT * FROM department');
    return rows;
}

// Function to delete a department
async function deleteDepartment() {
    const departments = await getDepartments();
    // Creating a list of chouices for the user to select from 
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Which department would you like to delete?',
            choices: departmentChoices
        }
    ]);

    try {
        await db.query('DELETE FROM department WHERE id = ?' [departmentId]);
        console.log('Department deleted successfully.');
    } catch (err) {
        console.error('Error deleting department:', err);
    }
}

// Function to view the total budget of a department 
async function viewDepartmentBudget() {
    const departments = await getDepartments();
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to view its total budget:',
            choices: departmentChoices
        }
    ]);

    try {
        // Querying the database to calculate the total budget of the selected department
        const [rows] = await db.query(
            'SELECT SUM(salary) AS total_budget FROM role WHERE department_id = ?',
            [departmentId]
        );
        console.log(`Total Utilized Budget for the Department: $${rows[0].total_budget}`);
    } catch (err) {
        console.error('Error viewing budget by department:', err);
    }
}

// Exporting the functions to be used in other parts of the application 
module.exports = {
    viewAllDepartments,
    addDepartment,
    getDepartments,
    deleteDepartment,
    viewDepartmentBudget,
};