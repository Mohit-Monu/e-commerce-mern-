const PRODUCT = require("../models/Product");
const CART = require("../models/Cart");
const ORDER = require("../models/Order");

async function AddToCart(req, res) {
  try {
    const productId = req.body.productId;
    const product = await PRODUCT.findById(productId);
    if (product.length == 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    const productDetail = {
      productId: product._id,
      title: product.title,
      price: product.price,
      original_price: product.original_price,
      image: product.images[0],
      category: product.category,
      userId: req.user._id,
    };
    const addedItem = await CART.create(productDetail);
    res.status(200).json({
      addedItem,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function GetCartItem(req, res) {
  try {
    const cartItem = await CART.find({ userId: req.user._id });
    res.status(200).json({
      cartItem,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function RemoveCartItem(req, res) {
  try {
    await CART.deleteOne({ _id: req.body.cartId });
    res.status(200).json({
      message: "Cart Deleted Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function getOrders(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const orders = await ORDER.find({ userId: req.user._id }).sort({createdAt:-1}).skip(skip).limit(pageSize);
    const totalDocs=await ORDER.countDocuments({ userId: req.user._id })
    totalPage=Math.ceil(totalDocs/pageSize)
    res.status(200).json({
      orders,
      totalPage
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function getOrderbyId(req, res) {
  try {
    const orders = await ORDER.findById(req.params.orderId);
    res.status(200).json({
      orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
module.exports = { AddToCart, GetCartItem, RemoveCartItem, getOrders,getOrderbyId };
