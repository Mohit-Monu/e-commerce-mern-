const express=require('express')
const UserController=require('../controllers/UserController')
const UserAuthenticate=require("../middleware/authorization")
const router=express.Router();

router.post('/addToCart',UserAuthenticate.authenticate,UserController.AddToCart);
router.get('/getCartItem',UserAuthenticate.authenticate,UserController.GetCartItem);
router.get('/getOrders',UserAuthenticate.authenticate,UserController.getOrders);
router.get('/getOrderbyId/:orderId',UserAuthenticate.authenticate,UserController.getOrderbyId);
router.delete('/removeCartItem',UserAuthenticate.authenticate,UserController.RemoveCartItem);


module.exports=router;