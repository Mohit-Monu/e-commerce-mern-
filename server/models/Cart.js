const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Carts = new Schema({
  title: {
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
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  productId:{
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("Carts", Carts);
