const inquirer = require('inquirer');
const { viewAllDepartments, addDepartment, deleteDepartment, viewDepartmentBudget } = require('./actions/departmentActions');
const { viewAllRoles, addRole, deleteRole } = require('./actions/roleActions');
const { viewAllEmployees, addEmployee, updateEmployeeRole, updateEmployeeManager, viewEmployeesByManager, viewEmployeesByDepartment, deleteEmployee } = require('./actions/employeeActions');

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
                'Update an employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View department budget',
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
            case 'Update an employee manager':
                await updateEmployeeManager();
                break;
            case 'View employees by manager':
                await viewEmployeesByManager();
                break;
            case 'View employees by department':
                await viewEmployeesByDepartment();
                break;
            case 'Delete a department':
                await deleteDepartment();
                break;
            case 'Delete a role':
                await deleteRole();
                break;
            case 'Delete an employee':
                await deleteEmployee();
                break;
            case 'View department budget':
                await viewDepartmentBudget();
                break;
            case 'Exit':
                db.end();
                console.log('Goodbye!');
                process.exit();
            default:
                console.log('Invalid action!');    
        }

        // Show the menu again 
        return mainMenu();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

module.exports = mainMenu;