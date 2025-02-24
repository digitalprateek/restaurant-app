const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const catchAsync = require('../core/catchAsync');
const {isLoggedIn} = require('../middlewares/AuthMiddlewares')

router.post('/', catchAsync(isLoggedIn), catchAsync(async(req, res)=>{
    const {userId} = req;
    // console.log(userId);
    const {restaurantId, items } = req.body;
    // console.log(restaurantId, items);
    await Order.create({userId: userId, orderedFrom: restaurantId, OrderItems: items }),
    res.status(201).json({
        message: "Order placed successfully",
        orderId: Order._id
    });
}));

module.exports = router;