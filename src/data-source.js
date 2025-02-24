const mongoose = require('mongoose');
const MongoDb =  process.env.dbUrl;
if (!MongoDb) {
    throw new Error('MongoDB connection string is not defined in environment variables');
}
class Database {
    static async connect() {
        try {
// Ensure the MongoDB connection string is correctly formatted
            await mongoose.connect(MongoDb);
            console.log('MongoDB connected successfully');
        } catch (err) {
            console.error('MongoDB connection error:', err);
            throw err; 
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