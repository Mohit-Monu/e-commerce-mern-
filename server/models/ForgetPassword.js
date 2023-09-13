const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const forgetpass=new Schema(
{
    uuid:{
        type:String,
        required: true
    },
    userId:{
        type:String,
        required: true
    },
    isactive:{
        type:Boolean,
        required: true
    }
})
module.exports=mongoose.model('forgetpass',forgetpass)