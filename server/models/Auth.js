const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users=new Schema(
{
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    isSeller:{
        type:Boolean,
        default: false,
    },
    profilePic:{
        type:String,
    },
    Country:{
        type:String,
    },
    pincode:{
        type:String,
    },
    Address:{
        type:String,
    },
    Phone:{
        type:String
    }
})
module.exports=mongoose.model('users',users)