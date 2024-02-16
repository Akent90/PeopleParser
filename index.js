// Importing the mainMenu function from the mainMenu.js file 
const mainMenu = require('./mainMenu');

mainMenu().catch(err => {
    console.error('Error:', err);
    // Exiting the app with a non-zero status code indicates that an error occurred 
    process.exit(1);
});
