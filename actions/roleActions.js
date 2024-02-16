const inquirer = require('inquirer');
const db = require('../db');

async function viewAllRoles() {
    try {
        const [rows] = await db.query('SELECT * FROM role');
        console.table(rows);
    } catch (err) {
        console.error(err);
    }
}

async function addRole() {
    const departments = await getDepartments();
    const { title, salary, departmentId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'Which department does this role belong to?',
            choices: departments.map(department => ({ name: department.name, value: department.id}))
        }
    ]);

    try {
        await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
        console.log(`Added ${title} to the database`);
    } catch (err) {
        console.error(err);
    }
}

async function getRoles() {
    const [rows] = await db.query('SELECT * FROM role');
    return rows;
}

async function deleteRole() {
    const roles = await getRoles();
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

    const { roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'Which role would you like to delete?',
            choices: roleChoices
        }
    ]);

    try {
        await db.query('DELETE FROM role WHERE id = ?', [roleId]);
        console.log('Role deleted successfully.');
    } catch (err) {
        console.error('Error deleting role:', err);
    }
}

module.exports = {
    viewAllRoles,
    addRole,
    getRoles,
    deleteRole,
};
