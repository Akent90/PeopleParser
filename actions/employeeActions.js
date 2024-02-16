// Importing necessary modules 
const inquirer = require('inquirer');
const db = require('../db');
const { getDepartments } = require('../actions/departmentActions');
const { getRoles } = require('../actions/roleActions'); 

// Function to view all employees 
async function viewAllEmployees() {
    try {
        const [rows] = await db.query('SELECT * FROM employee');
        // Displaying the results in a table format 
        console.table(rows);
    } catch (err) {
        console.error(err);
    }
}

// Function to add a new employee 
async function addEmployee() {
    const roles = await getRoles();
    const managers = await getManagers();

    // Creating choices for roles and managers for the user to select from 
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

// Function to update an employee's role 
async function updateEmployeeRole() {
    // Getting a list of employees for selection
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

    const roles = await getEmployees();
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

// Function to retrive a list of all employees 
async function getEmployees() {
    const [rows] = await db.query('SELECT id, first_name, last_name FROM employee');
    return rows;
}

async function getManagers() {
    // Querying the database to select all employees who are managers 
    const [rows] = await db.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL');
    return rows;
}

async function updateEmployeeManager() {
    // Getting a list of employees for selection
    const employees = await getEmployees();
    const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    // Getting a list of managers for selection
    const managers = await getManagers();
    const managerChoices = managers.map(mgr => ({ name: `${mgr.first_name} ${mgr.last_name}`, value: mgr.id }));
    managerChoices.unshift({ name: 'None', value: null });

    const { employeeId, managerId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee\'s manager do you want to update?',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'Who is the new manager?',
            choices: managerChoices
        }
    ]);

    try {
        await db.query('UPDATE employee SET manager_id = ? WHERE id = ?', [managerId, employeeId]);
        console.log('Employee manager updated successfully.');
    } catch (err) {
        console.error('Error updating employee manager:', err);
    }
}

// Function to view employees by their manager 
async function viewEmployeesByManager() {
    const managers = await getManagers();
    const managerChoices = managers.map(mgr => ({ name: `${mgr.first_name} ${mgr.last_name}`, value: mgr.id }));

    const { managerId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'managerId',
            message: 'Select a manager to view their employees:',
            choices: managerChoices
        }
    ]);

    try {
        // Querying the databse to select employees who report to the chosen manager
        const [rows] = await db.query('SELECT * FROM employee WHERE manager_id = ?', [managerId]);
        console.table(rows);
    } catch (err) {
        console.error('Error viewing employees by manager:', err);
    }
}

// Function to view employees by their department  
async function viewEmployeesByDepartment() {
    const departments = await getDepartments();
    const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));

    const { departmentId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'departmentId',
            message: 'Select a department to view its employees:',
            choices: departmentChoices
        }
    ]);

    try {
        const [rows] = await db.query(
            'SELECT e.id, e.first_name, e.last_name, r.title FROM employee e JOIN role r ON e.role_id = r.id WHERE r.department_id = ?',
            [departmentId]
        );
        console.table(rows);
    } catch (err) {
        console.error('Error viewing employees by department:', err);
    }
}

// Function to delete an employee 
async function deleteEmployee() {
    const employees = await getEmployees();
    const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));

    const { employeeId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee would you like to delete?',
            choices: employeeChoices
        }
    ]);

    try {
        await db.query('DELETE FROM employee WHERE id = ?', [employeeId]);
        console.log('Employee deleted successfully.');
    } catch (err) {
        console.error('Error deleting employee:', err);
    }
}

// Exporting functions to be used in other parts of the application 
module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole, 
    getEmployees,
    getManagers,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteEmployee,
};