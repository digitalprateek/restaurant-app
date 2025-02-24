const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    price: {type: Number, required: true},
    img: [{type: String, required: true}],
    available: {type: Boolean, default: true},
    restaurantName: {type: String, required: true},
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true}
}, {timestamps: true, versionKey: false});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;