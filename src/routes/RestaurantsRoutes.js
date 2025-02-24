const express = require("express");
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const catchAsync = require('../core/catchAsync')
// const mongoose = require('mongoose');

//add a restaurant listing
router.post("/",catchAsync(async(req, res) => {
  // console.log(req.body);
  // console.log("creating the Restaurant");
  const {name, desc, rating, img} = req.body;
  // const restaurant = new Restaurant({name, desc, rating, img});
  // await restaurant.save(); // this was how to save data but can be done a little more in a simple way bellow
  const restaurant = await Restaurant.create({name, desc, rating, img});
  // console.log(restaurant);
  // console.log("Restaurant has been created successfully");
  res.status(200).json({
    "message": "Restaurant has been registered, thanks.",
    "id": restaurant._id
  });
}));

//get all retaurants
router.get("/", catchAsync(async (req, res) => {
  // try {
    // throw new Error('Some error occurred');
    const restaurants = await Restaurant.find(); // Fetch restaurants from the database
    res.status(200).json(restaurants); // Send the response with the restaurants data
  // }
  //  catch (err) {
  //   console.error('Error fetching restaurants:', err); // Log the error for debugging
  //   res.status(500).json({ message: 'Request failed to find restaurants. Please check your network or try again later' }); // Send an error response
  // }
}));

// const isValidObjectId = (id) => {
//   return mongoose.Types.ObjectId.isValid(id) && new mongoose.Types.ObjectId(id).toString() === id;
// };
//get a restaurant by id
router.get('/:restaurantId', catchAsync(async (req, res) => {
    // const restaurantId = req.params.restaurantId;
  const {restaurantId} = req.params; //shorthand destructure for object
    // const restaurant = await Restaurant.findById(restaurantId);
    
    // if (!isValidObjectId(restaurantId)) {
    //   throw new Error('Invalid restaurant ID');
    // }
  
    const restaurant = await Restaurant.findById(restaurantId);
  
    // if (!restaurant) {
    //   throw new Error('Restaurant not found');
    // }
    res.status(200).json(restaurant);
  // console.log(req.params);
}));

//update a restaurant with patch request because only some changes when reuire complete change then put request
router.patch('/:restaurantId', catchAsync(async(req, res)=>{
  const {restaurantId} = req.params;
  const {name, desc, rating, img} = req.body;
  await Restaurant.findByIdAndUpdate(restaurantId, {name, desc, rating, img});
  res.status(200).json({"message":"Restaurant is updated syccessfully"});
}));


// delete a restaurant by id with error handlings and response status errors
router.delete('/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;

  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant has been deleted successfully" });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ message: "An error occurred while deleting the restaurant" });
  }
});


module.exports = router;
