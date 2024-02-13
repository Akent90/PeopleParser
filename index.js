require('dotenv').config();
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create the connection to the database 
const db = mysql.createConection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    databade: process.env.DB_NAME
}).promise();

// Main menu prompt using Inquirer
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

        // Show the menu again 
        return mainMenu();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

// Function to view all departments 
async function viewAllDepartments() {
    try {
        const [rows] = await db.query('SELECT * FROM department');
        console.table(rows);
    } catch (err) {
        console.error(err);
    }
}

// Function to view all roles
async function viewAllRoles() {
    try {
        const [rows] = await db.query('SELECT * FROM role');
        console.table(rows);
    } catch (err) {
        console.error(err);
    }
}

// Function to view all employees 
async function viewAllEmployees() {
    try {
        const [rows] = await db.query('SELECT * FROM employee');
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

async function getDepartments() {
    const [rows] = await db.query('SELECT * FROM department');
    return rows;
}

async function getRoles() {
    const [rows] = await db.query('SELECT * FROM role');
    return rows;
}

async function getEmployees() {
    const [rows] = await db.query('SELECT id, first_name, last_name FROM employee');
    return rows;
}

async function getManagers() {
    const [rows] = await db.query('SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL');
    return rows;
}

mainMenu();