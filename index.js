const mainMenu = require('./mainMenu');

mainMenu().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});