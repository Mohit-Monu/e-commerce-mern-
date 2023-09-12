const express=require('express')
const OrderController=require('../controllers/OrderController')
const UserAuthenticate=require("../middleware/authorization")

const router=express.Router();

router.post('/membership',UserAuthenticate.authenticate,OrderController.buymembership);
router.post('/updatetransaction',UserAuthenticate.authenticate,OrderController.updatetransaction);

module.exports=router;