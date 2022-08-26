const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
        unique:true

    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true,
    },
    medicalRecord:[
        {
            type:String,
        }
    ], 
    ePrescriptions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Prescription',
            default:[]
        }
    ],
    appointments:[
       {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'appointment',
        default:[]
       }
    ]

},{
    timestamps:true
})
const Patient = mongoose.model('Patient',patientSchema)
module.exports=Patient

