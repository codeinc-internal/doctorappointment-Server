const mongoose = require('mongoose')
const appointmentSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'Doctor'
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    }
},{
    timestamps:true
})


const Appointment= mongoose.model('appointment',appointmentSchema)

module.exports=Appointment