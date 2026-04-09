const Restaurant = require("../models/Restaurant");

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().sort({ createdAt: -1 });
    return res.json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch restaurant" });
  }
};

module.exports = { getRestaurants, getRestaurantById };
