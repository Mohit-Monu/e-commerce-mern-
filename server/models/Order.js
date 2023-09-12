const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Order = new Schema({
  product: [],
  totalPrice: {
    type: String,
    required: true,
  },
  Paymentstatus: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Pincode: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
  },
  payment_id: {
    type: String,
  },
  Status: {
    type: String,
    required: true,
  },
},{timestamps:true});
module.exports = mongoose.model("Order", Order);
