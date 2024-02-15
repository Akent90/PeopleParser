const inquirer = require('inquirer');
const { viewAllDepartments, addDepartment } = require('./actions/departmentActions');
const { viewAllRoles, addRole } = require('./actions/roleActions');
const { viewAllEmployees, addEmployee, updateEmployeeRole } = require('./actions/employeeActions');

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
            case 'Update an employee role':
                await updateEmployeeRole();
                break;
            case 'Exit':
            db.end();
            console.log('Goodbye!');
            process.exit();
        }

        // Show the menu again 
        return mainMenu();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

module.exports = mainMenu;