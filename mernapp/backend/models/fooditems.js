const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  options: {
    type: [{
      half: String,
      full: String
    }],
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { collection: "food_items" });

module.exports = mongoose.model("FoodItem", FoodItemSchema);
