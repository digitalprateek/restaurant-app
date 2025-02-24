const mongoose  = require('mongoose');

// creating a schema is not neccessary but it is a good practice and recommended. it is like creating columns in the relational database
// Using Mongoose as an ODM (Object Data Modeling) library because I'm using MongoDB. 
// If I were using a relational database like MySQL, I would use Sequelize as an ORM (Object-Relational Mapping) library.

//adding index true in name is a good practice to make your queries work faster in a binary search
//if index true is not there the search is linear then takes some extra time which is not good for large prjects
//but we do not add index true for everything because it takes space so we only use on important keys


const restaurantSchema = new mongoose.Schema({
    name: { type: String, index: true, required: true },
    desc: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5 },
    img: { type: String, required: true },
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }] //defining foods as an array of objects
    //we also define the objectId of the user who created the restaurant so only that user can update or delete the restaurant
    //author: { type: mongoose.Schema.Types.ObjectId, ref: 'auth', required: true }
}, { timestamps: true });
//timestamps true is for tracking every entry or update of items stored in db it tell date and time which is good for tracking
const Restaurant = mongoose.model('Restaurant', restaurantSchema );

module.exports = Restaurant;
