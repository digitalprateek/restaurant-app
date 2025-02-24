const express = require("express");
const router = express.Router({ mergeParams: true });
const Restaurant = require('../models/Restaurant');
const catchAsync = require('../core/catchAsync');
const Food = require('../models/Food');

// Add a food listing
router.post('/', catchAsync(async (req, res) => {
    const { restaurantId } = req.params;
    console.log('Restaurant ID:', restaurantId);
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }
    const { name, desc, price, img } = req.body;
    const food = await Food.create({ name, desc, price, img, restaurantName: restaurant.name, restaurant: restaurantId });
    restaurant.foods.push(food._id); // Add the food to the restaurant's foods array
    await restaurant.save();
    res.status(201).json({ message: `${name} has been added to the ${restaurant.name} restaurant successfully.`, food });
}));

// Get all foods
router.get('/', catchAsync(async (req, res) => {
    const { restaurantId } = req.params;
    // console.log('Restaurant ID:', restaurantId);
    // varifying the restaurant
    // const restaurant = await Restaurant.findById(restaurantId); //this will also work but have to call server twice for foods

    const restaurant = await Restaurant.findById(restaurantId).populate('foods'); // searching for restaurant and .populate('foods') will search for foods available in the restaurant and fills the foods array

    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }
     
     //const foods = await Food.find({ restaurant: restaurantId });
    res.status(200).json({foods: restaurant.foods, restaurant: restaurant});
}));

// Get all foods for a specific restaurant
// router.get('/', catchAsync(async (req, res) => {
//     const { restaurantId } = req.params;
//     console.log('Restaurant ID:', restaurantId);
//     // Ensure the restaurant exists
//     const restaurant = await Restaurant.findById(restaurantId).populate('foods');
//     if (!restaurant) {
//         return res.status(404).json({ message: 'Restaurant not found' });
//     }
//     res.status(200).json(restaurant.foods);
// }));

// Update a food item
router.patch('/:foodId', catchAsync(async (req, res) => {
    const { foodId } = req.params;
    const { name, description, price, available } = req.body;

    const food = await Food.findByIdAndUpdate(foodId, { name, description, price, available }, { new: true });
    if (!food) {
        return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({ message: 'Food item updated successfully', food });
}));

// Delete a food item
router.delete('/:foodId', catchAsync(async (req, res) => {
    const { foodId } = req.params;

    const food = await Food.findByIdAndDelete(foodId);
    if (!food) {
        return res.status(404).json({ message: 'Food item not found' });
    }

    // Remove the food item from the restaurant's foods array
    await Restaurant.updateOne({ _id: food.restaurant }, { $pull: { foods: foodId } });

    res.status(200).json({ message: 'Food item deleted successfully' });
}));

module.exports = router;