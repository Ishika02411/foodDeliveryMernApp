



const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [String],  // Array of strings
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true  // Default value if not provided
  },
  calories: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  tags: {
    type: [String]  // Array of tags
  },
  addedDate: {
    type: Date,
    required: true
  },
  nutrition: {
    fat: {
      type: String,
      required: true
    },
    protein: {
      type: String,
      required: true
    },
    carbohydrates: {
      type: String,
      required: true
    }
  }
}, { 
  collection: 'fooditems'  // Explicitly specifying the collection name
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
