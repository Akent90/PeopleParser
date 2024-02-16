# PeopleParser

![License Badge](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

PeopleParser is a command-line application designed to streamline the interaction with a company's employee database. This tool primarily targets developers who require a robust interface to manage and view employee-related data efficiently. By integrating a simple command-line interface, PeopleParser makes it easier for both technical and non-technical staff to access and manipulate critical employee information.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)

## Installation

To set up and run PeopleParser, you will need to install a few key components:

Node.js: This is the fundamental runtime environment required to execute the application. Node.js can be downloaded from the official Node.js website. Ensure that you install the version that is compatible with your operating system.

npm (Node Package Manager): npm is generally included when you install Node.js. It is crucial for managing the Node.js packages that the application depends on. You can verify its installation by running npm -v in your command line after installing Node.js.

MySQL: The application uses MySQL as its database system. You can download and install MySQL from the official MySQL website. After installation, you'll need to set up the necessary database and tables in accordance with the application's schema. This step is essential to ensure that the application can interact correctly with the database.

## Usage

To effectively use PeopleParder, follow these steps:

Start MySQL Database:

Ensure your MySQL server is running. You can start it through your system's service management tool or through MySQL Workbench.
Initialize the Database:

Set up the database schema and tables as per the application's requirements. This is usually done by executing a provided SQL script in the MySQL environment.
Configure the Application:

Navigate to the root directory of the EDMS application in your command line or terminal.
If the application requires any environment variables (such as database connection settings), set them up in a .env file in the root directory.
Install Dependencies:

Run npm install to install all necessary Node.js packages defined in the package.json file.
Start the Application:

Execute the command node index.js (or the appropriate start script) from the root directory of the application.
This will launch the command-line interface of the EDMS.
Interacting with the System:

Once the application starts, you'll be presented with a menu of actions to choose from.
Use the arrow keys to navigate through options like "View all departments", "Add an employee", "Delete a role", etc.
Select an option by hitting Enter. Follow the subsequent prompts to view data, add new records, update existing information, or perform deletions.
Exiting the Application:

To exit the application, choose the 'Exit' option from the main menu. This will safely close the application and return you to your command line.
Remember, PeopleParser is a command-line application, so all interactions will be text-based and navigated using keyboard inputs. Ensure that you follow the prompts carefully to correctly execute each operation.

## Contributing

Contributions are always welcome! If you're interested in improving or adding new features to PeopleParser, fork and clone the repository, create a new branch, push to your fork then submit a pull request! If your changes are approved, they will be merged into the main branch of the project.

## Tests

All tests are run locally.

## Questions

For any questions, please reach out to me.

## License

This project is licensed under the MIT license. More information can be found at [MIT](https://opensource.org/licenses/MIT).
