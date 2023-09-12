const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Products = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  original_price: {
    type: String,
    required: true,
  },
  images: [],
  rating: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Products", Products);
