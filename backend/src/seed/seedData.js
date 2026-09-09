const dotenv = require("dotenv");
const connectDb = require("../config/db");
const Restaurant = require("../models/Restaurant");

dotenv.config();

const data = [
  {
    name: "Biryani Blues",
    cuisine: ["Biryani", "North Indian"],
    deliveryTime: 32,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop",
    location: "Amayra Market, Mohali",
    menu: [
      { name: "Chicken Dum Biryani", description: "Classic Hyderabadi style", price: 329, isVeg: false },
      { name: "Paneer Biryani", description: "Loaded with paneer cubes", price: 279, isVeg: true }
    ]
  },
  {
    name: "Pizza Hub",
    cuisine: ["Pizza", "Italian"],
    deliveryTime: 28,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    location: "City Hospital, Kharar",
    menu: [
      { name: "Farmhouse Pizza", description: "Onion, capsicum and olives", price: 299, isVeg: true },
      { name: "Pepperoni Pizza", description: "Cheesy and spicy", price: 359, isVeg: false }
    ]
  },
  {
    name: "Sushi Bay",
    cuisine: ["Japanese", "Sushi"],
    deliveryTime: 40,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
    location: "Sector 42, Mohali",
    menu: [
      { name: "Salmon Nigiri", description: "Fresh salmon over rice", price: 449, isVeg: false },
      { name: "Avocado Roll", description: "Creamy avocado maki", price: 349, isVeg: true }
    ]
  }
];

const seed = async () => {
  try {
    await connectDb();
    await Restaurant.deleteMany();
    await Restaurant.insertMany(data);
    console.log("Restaurant seed complete");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
