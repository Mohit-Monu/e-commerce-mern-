const PRODUCT = require("../models/Product");

async function GetProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const product = await PRODUCT.find().skip(skip).limit(pageSize);
    const totalDocs=await PRODUCT.countDocuments()
    totalPage=Math.ceil(totalDocs/pageSize)
    res.status(200).json({
      product,
      totalPage
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function GetProduct(req, res) {
  try {
    const product = await PRODUCT.findById(req.params.productId);
    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
async function GetProductById(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * pageSize;
    const product = await PRODUCT.find({category:req.params.categoryId}).skip(skip).limit(pageSize);
    const totalDocs=await PRODUCT.countDocuments({category:req.params.categoryId})
    totalPage=Math.ceil(totalDocs/pageSize)
    if(product.length==0){
      return  res.status(500).json({ message: "Something went wrong" });
    
    }
    res.status(200).json({
      product,
      totalPage
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong" });
  }
}

async function AddProduct(req, res) {
  try {
    const { title, description, price, original_price, images, rating,category } =
      req.body;
    const newproduct = await PRODUCT.create({
      title,
      description,
      price,
      original_price,
      images,
      rating,
      category
    });
    res.status(200).json({
      message: "product Added",
      newproduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
module.exports = { GetProducts, AddProduct,GetProduct,GetProductById };
