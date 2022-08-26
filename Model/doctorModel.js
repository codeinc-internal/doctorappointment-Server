const {Schema , model}=require('mongoose')

const doctorSchema = Schema({
    userId :{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    firstname:{
        type:String,
        required:true
    }
    ,
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    specialization:{
        type:String,
        required:true
    },
    education :{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true,
    },
    consultatingFee:{
        type:Number,
        required:true,
    },
    timing:{
        type:Array,
        default:[]
    },
    status:{
        type:String,
        default:"pending"
    }
},{
    timestamps:true
})
module.exports.Doctor= model('Doctor',doctorSchema)
