const inquirer = require('inquirer');
const db = require('../db');

async function viewAllEmployees() {
    try {
        const [rows] = await db.query('SELECT * FROM employee');
        console.table(rows);
    } catch (err) {
        console.error(err);
    }
}

async function addEmployee() {
    const roles = await getRoles();
    const managers = await getManagers();

    const roleChoices = roles.map( role => ({ name: role.title, value: role.id }));
    const managerChoices = managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }));

    managerChoices.unshift({ name: 'None', value: null });

    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'roleId',
            message: "What is the employee's role?",
            choices: roleChoices,
        },
        {
            type: 'list',
            name: 'managerId',
            message: "Who is the employee's manager?",
            choices: managerChoices,
        },
    ]);

    try {
        await db.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [firstName, lastName, roleId, managerId]
        );
        console.log(`Added ${firstName} ${lastName} to the database`);
    } catch (err) {
        console.error('Error adding new employee:', err);
    }
}

async function updateEmployeeRole() {
    const employees = await getEmployees();
    const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee\'s role do you want to update?',
            choices: employeeChoices
        }
    ]);

    const roles = await getRandomValues();
    const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

    const { roleId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'roleId',
            message: 'What is the new role?',
            choices: roleChoices
        }
    ]);

    try {
        await db.query('UPDATE employee SET role_id = ?', [roleId, employeeId]);
        console.log('Employee role updated successfully.');
    }   catch (err) {
        console.error(err);
    }         
}

async function getEmployees() {
    const [rows] = await db.query('SELECT id, first_name, last_name FROM employee');
    return rows;
}

async function getManagers() {
    const [rows] = await db.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL');
    return rows;
}

module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole, 
    getEmployees,
    getManagers
};