const jsw = require("jsonwebtoken");
const User = require("../models/Auth");
require("dotenv").config();
async function authenticate(req, res, next) {

  try {
    const token = req.header("Authorization");
    const user = jsw.verify(token, process.env.TOKEN);
    const user1 = await User.findById(user.userId);
    req.user = user1;
    next();
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false });
  }
}
module.exports = { authenticate };
