const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderedFrom : {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
    OrderItems: [
        {
        foodId: String,
         foodName: String,
         price: Number,
         qty: Number,
         _id: false
    }]
}, {timestamps: true, versionKey: false});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;