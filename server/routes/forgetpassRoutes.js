const express=require('express')
const ForgetPassController=require('../controllers/ForgetPassController')

const router=express.Router();

router.post('/forgotpassword/:email',ForgetPassController.resetpass);
router.get('/resetpassword/:uuid',ForgetPassController.uuidvalidater);
router.post('/createpass',ForgetPassController.createpass);


module.exports=router;