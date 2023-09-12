const Razorpay = require("razorpay");
const ORDER = require("../models/Order");
const CART = require("../models/Cart");
const PRODUCT = require("../models/Product");
async function buymembership(req, res) {
  try {
    const userdata = req.body;
    let amount = 0;
    const productPromises = userdata.product.map(async (ids) => {
      const product = await PRODUCT.findById(ids);
      const myobj = {
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        category: product.category,
      };
      amount += product.price / 1;
      return myobj;
    });
    const product = await Promise.all(productPromises);
    if (amount <= 499) {
      amount += 40;
    }
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    rzp.orders.create(
      { amount: amount * 100, currency: "INR" },
      async (err, order) => {
        if (err) {
          res.status(500).json({ message: "Something went wrong " });
        } else {
          userdata.product = product;
          userdata.totalPrice = amount;
          userdata.userId = req.user._id;
          userdata.orderid = order.id;
          userdata.Status = "waiting to confirm";
          if (userdata.cartId != null) {
            userdata.cartId.forEach(async (ids) => {
              await CART.deleteOne({ _id: ids });
            });
          }
          if (req.body.method === "COD") {
            userdata.Paymentstatus = "COD";
            await ORDER.create(userdata);
            res.status(201).json({ message: "Order Placed Success" });
          } else if (req.body.method === "Online") {
            userdata.Paymentstatus = "PENDING";
            await ORDER.create(userdata);
            res.status(201).json({ order, key_id: rzp.key_id });
          } else {
            res.status(500).json({ message: "Invalid method" });
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
}
async function updatetransaction(req, res) {
  try {
    const { payment_id, order_id } = req.body;
    const order = await ORDER.findOneAndUpdate(
      { orderid: order_id },
      { payment_id: payment_id, Paymentstatus: "Successfull" },
      { new: true }
    );
    res.status(202).json({
      success: true,
      orderId: order._id,
      message: "Transaction Successful",
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong " });
  }
}
module.exports = { buymembership, updatetransaction };
