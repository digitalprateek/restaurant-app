// server.js is the main entry point for the application.
// It sets up the Express server, connects to the database, and defines routes.
require('dotenv').config();
const app = require('./app');
const Database = require('./data-source.js');

// const port = process.env.port || 8080;
const port = 8080;
(async () => {
    try {
        await Database.connect();
        console.log('DB Connected Successfully');
        const server = app.listen(port, () => {
            console.log(`App is started on port: ${port}`);
        });

        const shutdown = async () => {
            console.log('Shutting down the server');
            try {
                await Database.disconnect();
                server.close(() => {
                    console.log('Server closed');
                    process.exit(0);
                });
            } catch (err) {
                console.error('Error during server shutdown:', err);
                process.exit(1);
            }
        };

        // Listen for termination signals
        process.on('SIGINT', shutdown); // Handle Ctrl+C
        process.on('SIGTERM', shutdown); // Handle termination signal
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process with failure
    }
})();