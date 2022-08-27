const {User}=require('../Model/userModel')
const {Otp} =require('../Model/optModel')
const {Doctor} = require('../Model/doctorModel')
const Appointment = require('../Model/appointmentModel')
const ePrescription = require('../Model/e-prescriptionModel')
const Patient = require('../Model/patientModel')


module.exports.getAllDoctor=async(req,res)=>{
    try{
        const users = await Doctor.find({status:'Approved'})
        res.status(200).send({
            message:'success',
            length:users.length,
            data:users
           
        })

    }catch(err){
        res.status(404).json({
            message:err,
            success:'fail'
        })
    }
}
module.exports.getDoctor=async(req,res)=>{
    try{
        const doctor = await Doctor.findById({_id:req.params.id})
        res.status(200).send({
            message:'success',
           
            data:doctor
           
        })

    }catch(err){
        res.status(404).json({
            message:err,
            success:'fail'
        })
    }
}
module.exports.updateDoctor= async(req,res)=>{
    try {
        const doctor = await  Doctor.findByIdAndUpdate({_id:req.params.id},req.body,{
            new:true,
            runValidators:false
        })
        if(!doctor){
            res
            .status(404)
            .json({
                status:"INVALID ",
              
            })
        }
        res
        .status(200)
        .json({
            success:true,
            message:'successfully updated',
            data:{
                doctor
            }
          
        })
    } catch (err) {
        res.status(404).json({
            message:err,
            success:'fail'
        })
    }
}
module.exports.ApprovedAppointment= async(req,res)=>{
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id,{status:'Approved'},{
            new:true
        })
        
        const user = await User.findOne({_id:appointment.userId})
        const unseenNotification= user.unseenNotification
        unseenNotification.push({
            type:'Appointment  Request Approved',
            message:`Appointmenr approved`
        })
       
       await user.save()
  
     
        res.status(200).send({
            success:true,
            message:'Approved successFully Successfully',
            data:appointment
        })
    } catch (error) {
        res.status(404).json({
            message:error,
            success:'fail'
        })
    }
}
module.exports.getAppointmentById= async(req,res)=>{
    try {
        const appointment = await Appointment.find({doctorId:req.user._id})
        res.status(200).send({
            success:true,
            
            data:{
                appointment
            }
        })

    } catch (error) {
        res.status(404).json({
            message:error,
            success:'fail'
        })
    }
}
module.exports.e_prescription=  async(req,res)=>{
    try {
        const doctor = await Doctor.findOne({userId:req.user._id})
         if(!doctor){
            res.status(404).json({
                message:error,
                success:'fail'
            })
         }
        const toString = String(doctor._id)
        console.log(toString)
          
         const prescription = new ePrescription({...req.body,doctorId:toString,patientId:req.params.id})
         
         await prescription.save()
         const patient = await Patient.findById(req.params.id)
         const ePrescriptions = patient.ePrescriptions
         ePrescriptions.push({
            _id:prescription._id
         })
         await patient.save()
         res.status(200).send({
            success:true,
            data:{
                    prescription
            },
            patient:{
                patient
            }
        })


    } catch (error) {
        res.status(404).json({
            message:error,
            success:'fail'
        })
    }
}
