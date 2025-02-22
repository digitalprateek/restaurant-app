const mongoose = require('mongoose');
const MongoDb = mongodb+srv://prateek005:NwzeITJ31JTGqmYe@cluster0.8qf5p.mongodb.net/dine&dash?retryWrites=true&w=majority&appName=Cluster0;
class Database {
    static async connect() {
        try {
            // Ensure the MongoDB connection string is correctly formatted
            await mongoose.connect(MongoDb);
            console.log('MongoDB connected successfully');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            throw err; // Rethrow the error to be caught in the server.js
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log('DB disconnected successfully');
        } catch (err) {
            console.error('Error disconnecting from DB:', err);
        }
    }
}

module.exports = Database;
