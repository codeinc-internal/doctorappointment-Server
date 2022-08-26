const {User}=require('../Model/userModel')
const {Otp} =require('../Model/optModel')
const {Doctor} = require('../Model/doctorModel')
const Appointment = require('../Model/appointmentModel')


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
            
            data:appointment
        })

    } catch (error) {
        res.status(404).json({
            message:error,
            success:'fail'
        })
    }
}
