const Patient = require("../Model/patientModel")

module.exports.patientInfo=async(req,res)=>{
    try {
        const patient = new Patient({...req.body,userId:req.user._id,profilePic:req.file.path})
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
            message:'error'
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
            message:'error'
        })
    }
}