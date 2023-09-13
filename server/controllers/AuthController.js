const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const USERS = require("../models/Auth");
const CONFIRMEMAIL = require("../models/ConfirmEmail");
const AWS = require("aws-sdk");
const multer = require("multer");
const Sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");
const upload = multer({ storage: multer.memoryStorage() });
function generateAccessToken(id, name) {
  return jwt.sign({ userId: id, userName: name }, process.env.TOKEN);
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await USERS.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).json({
            message: "Logged in successfully",
            token: generateAccessToken(user._id, user.name),
            user,
          });
        } else {
          res.status(401).json({ message: "Wrong password" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function activateAccount(req, res) {
  try {
    const uuid = req.params.id;
    const user = await CONFIRMEMAIL.findOneAndUpdate({ uuid: uuid },{isActive:false});
    if (user) {
      if (user.isActive) {
        await USERS.create({
          name: user.name,
          email: user.email,
          password: user.password,
        });
        res.status(200).json({ message: "Account Verified True" });
      } else {
        res.status(404).json({ message: "Email not found" });
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function adduser(req, res) {
  try {
    const { name, email, password } = await req.body;
    if (password.length < 5) {
      res.status(403).json({ message: "password should be atleast 6 digits" });
      return;
    }
    const search = await USERS.findOne({ email: email });
    if (search) {
      res.status(403).json({ message: "email already exist" });
    } else {
      const saltrounds = 10;
      bcrypt.hash(password, saltrounds, async (err, hash) => {
        const passwordhash = hash;
        if (err) {
          res.status(500).json({ message: "Something went wrong" });
        } else {
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
              email: email,
            },
          ];
          tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: "Confirm your Account from here",
            textContent:
              "We have requested to active you account on e-commerce click on the below link to reset http://localhost:3000/activateaccount/" +
              uuid,
          });
          const newuser = await CONFIRMEMAIL.create({
            name: name,
            email: email,
            password: passwordhash,
            isActive: true,
            uuid: uuid,
          });
          res.status(201).json({
            message: "User Created Please confirm the Email",
          });
        }
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function uploadPic(req, res) {
  upload.single("file")(req, res, async (err) => {
    try {
      const userId = req.user._id;
      const filename = "File" + userId + "/" + Date.now();
      const fileURl = await uploadToS3(req.file.buffer, filename);
      await USERS.findByIdAndUpdate(userId, { profilePic: fileURl });
      res.status(200).json({ fileURl, success: true });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Something went wrong " });
    }
  });
}
async function uploadToS3(data, filename) {
  try {
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });
    var params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: "public-read",
    };
    const response = await s3bucket.upload(params).promise();
    return response.Location;
  } catch (err) {
    console.log(err);
    return err;
  }
}
async function updateProfile(req, res) {
  try {
    const userId = req.user._id;
    const myobj = {
      name: req.body.name,
      Country: req.body.country,
      pincode: req.body.pincode,
      Address: req.body.address,
      Phone: req.body.phone,
    };
    await USERS.findByIdAndUpdate(userId, myobj, { new: true });
    res.status(200).json({ myobj, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong " });
  }
}
module.exports = { adduser, login, uploadPic, updateProfile, activateAccount };
