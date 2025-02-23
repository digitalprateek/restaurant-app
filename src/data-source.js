// const mongoose = require('mongoose');
// const MongoDb = process.env.dbUrl;
// class Database {
//     static async connect() {
//         try {
//             // Ensure the MongoDB connection string is correctly formatted
//             await mongoose.connect(MongoDb);
//             console.log('MongoDB connected successfully');
//         } catch (err) {
//             console.error('MongoDB connection error:', err);
//             throw err; // Rethrow the error to be caught in the server.js
//         }
//     }

//     static async disconnect() {
//         try {
//             await mongoose.disconnect();
//             console.log('DB disconnected successfully');
//         } catch (err) {
//             console.error('Error disconnecting from DB:', err);
//         }
//     }
// }

// module.exports = Database;
const mongoose = require('mongoose');

class Database {
    static async connect() {
        const MongoDb = process.env.dbUrl;

        if (!MongoDb) {
            throw new Error('MongoDB connection string is not defined in environment variables.');
        }

        try {
            // Check if already connected
            if (mongoose.connection.readyState === 1) {
                console.log('MongoDB is already connected.');
                return;
            }

            // Connect without deprecated options
            await mongoose.connect(MongoDb);
            console.log('MongoDB connected successfully');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            throw err; // Rethrow the error to be caught in the server.js
        }
    }

    static async disconnect() {
        try {
            // Check if already disconnected
            if (mongoose.connection.readyState === 0) {
                console.log('MongoDB is already disconnected.');
                return;
            }

            await mongoose.disconnect();
            console.log('DB disconnected successfully');
        } catch (err) {
            console.error('Error disconnecting from DB:', err);
        }
    }
}

module.exports = Database;
