const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const confirmmail=new Schema(
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
    isActive:{
        type:Boolean,
        default: false,
    },
    uuid:{
        type:String,
        required: true
    }
})
module.exports=mongoose.model('confirmmail',confirmmail)