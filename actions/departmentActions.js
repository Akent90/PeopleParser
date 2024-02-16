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

async function getDepartments() {
    const [rows] = await db.query('SELECT * FROM department');
    return rows;
}

async function deleteDepartment() {
    const departments = await getDepartments();
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

module.exports = {
    viewAllDepartments,
    addDepartment,
    getDepartments,
};