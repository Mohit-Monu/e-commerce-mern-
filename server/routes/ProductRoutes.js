const express=require('express')
const ProductController=require('../controllers/ProductController')

const router=express.Router();

router.post('/addProduct',ProductController.AddProduct);
router.get('/getProducts',ProductController.GetProducts);
router.get('/searchProducts/:productName',ProductController.SearchProducts);
router.get('/:categoryId',ProductController.GetProductById);
router.get('/:categoryId/:productId',ProductController.GetProduct);


module.exports=router;