const Sib = require("sib-api-v3-sdk");
const Forgetpass = require("../models/ForgetPassword");
const USERS = require("../models/Auth");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
async function resetpass(req, res) {
  try {
    const user = await USERS.findOne({ email: req.params.email });
    if (user) {
      const client = Sib.ApiClient.instance;
      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.API_KEY;
      const tranEmailApi = new Sib.TransactionalEmailsApi();
      const sender = {
        email: "bmohit700@gmail.com",
      };
      const uuid = uuidv4();
      const receivers = [
        {
          email: req.params.email,
        },
      ];
      tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: "Reset your password from here",
        textContent:
          "We have requested to reset your password from e-commmerce click on the below link to reset http://localhost:3000/resetpassword/" +
          uuid,
      });
      const done = await Forgetpass.create({
        uuid: uuid,
        isactive: true,
        userId: user.id,
      });
      if (done) {
        res.status(200).json({ message: "email sent successfully" });
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
}
async function uuidvalidater(req, res) {
  try {
    const id = req.params.uuid;
    const user = await Forgetpass.findOne({ uuid: id });
    if (user) {
      if (user.isactive) {
        res.status(200).json({ message: "Email found" });
      } else {
        res.status(404).json({ message: "Email not found" });
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
}
async function createpass(req, res) {
  try {
    const uuid = req.body.uuid;
    var newpass = req.body.newpass;
    if (newpass.length < 5) {
      res.status(403).json({ message: "password should be atleast 6 digits" });
      return;
    }
    const user = await Forgetpass.findOneAndUpdate({ uuid: uuid },{ isactive: false });
    const saltrounds = 10;
    const hashpass = await bcrypt.hash(newpass, saltrounds);
    await USERS.findOneAndUpdate({ _id: user.userId }, { password: hashpass });
    res.status(200).json({ message: "password changed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
}
module.exports = { resetpass, uuidvalidater, createpass };
