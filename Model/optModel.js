const {Schema , model}=require('mongoose')
// const jwt = require('jsonwebtoken')
const OptSchema = Schema({
    number:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{type:Date,default:Date.now,index:{expries:300}}
},{timestamps:true})
module.exports.Otp= model('Otp',OptSchema)