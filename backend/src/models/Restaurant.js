const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    isVeg: { type: Boolean, default: true },
    image: { type: String, default: "" }
  },
  { _id: true }
);

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    cuisine: [{ type: String }],
    deliveryTime: { type: Number, default: 30 },
    rating: { type: Number, default: 4.2 },
    image: { type: String, default: "" },
    location: { type: String, default: "" },
    menu: [menuItemSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
