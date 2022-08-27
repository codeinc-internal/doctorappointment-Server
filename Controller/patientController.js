const ePrescription = require("../Model/e-prescriptionModel")
const Patient = require("../Model/patientModel")

module.exports.patientInfo=async(req,res)=>{
    try {
        const patient = new Patient({...req.body,userId:req.user._id, profilePic:req.file.filename})
       
        await patient.save()

        res.status(200).send({
            success:'true',
            data:{
                patient
            }
        })

    } catch (error) {
        res.status(404).json({
            success:'Fail',
            message:error
        })
    }
}
module.exports.getPatientInfo=async(req,res)=>{
    try {
        const patient = await Patient.findOne({userId:req.user._id})
        await patient.save()

        res.status(200).send({
            success:'true',
            data:{
                patient
            }
        })

    } catch (error) {
        res.status(404).json({
            success:'Fail',
            message:error
        })
    }
}
module.exports.getEprescription = async(req,res)=>{
    try {
        const patient = await Patient.findOne({userId:req.user._id})
        const toString = String(patient._id)
        const prescription = await ePrescription.find({patientId:toString}).populate({
            path:'patientId doctorId',
            select:'firstname'
        })
        res.status(200).send({
            success:'true',
            data:{
                prescription
            }
        })
    
    } catch (error) {
        res.status(404).send({
            success:'Fail',
            error
        })
    }
}