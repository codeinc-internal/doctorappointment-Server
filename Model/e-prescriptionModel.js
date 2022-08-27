const mongoose  = require('mongoose')
const ePrescriptionSchema = new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Patient'
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Doctor'
    },
    prescriptionText:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:new Date()
    }
})
const ePrescription=mongoose.model('Prescription',ePrescriptionSchema)
module.exports=ePrescription