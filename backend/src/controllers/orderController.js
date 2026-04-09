const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const { restaurant, items, deliveryAddress } = req.body;
    if (!restaurant || !items?.length || !deliveryAddress) {
      return res.status(400).json({ message: "Restaurant, items and delivery address are required" });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await Order.create({
      user: req.user.id,
      restaurant,
      items,
      totalAmount,
      deliveryAddress
    });

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Failed to place order" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("restaurant", "name image")
      .sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = { placeOrder, getMyOrders };
