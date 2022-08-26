const {Schema , model}=require('mongoose')
const jwt = require('jsonwebtoken')
const userSchema = Schema({
    number:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','doctor','admin'],
        default:'user'
    },
    seenNotification:{
        type:Array,
        default:[]
    },
    unseenNotification:{
        type:Array,
        default:[]
    },
    
},{timestamps:true})
userSchema.methods.generateJWT=function(){
    const token = jwt.sign({
        _id:this._id,
        number:this.number
    },process.env.JWT_SECRET,{expiresIn:'7d'})
    return token
}
module.exports.User= model('User',userSchema)