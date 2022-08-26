const {User}=require('../Model/userModel')

const {Doctor} = require('../Model/doctorModel')
const authMiddleware = require('../Middleware/authmiddleware')

module.exports.changeDoctorStatus=async(req,res)=>{
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id,{status:'Approved'},{
            new:true
        })
        
        const user = await User.findOne({_id:doctor.userId})
        const unseenNotification= user.unseenNotification
        unseenNotification.push({
            type:'Doctor Request Approved',
            message:`Your doctor account has been ${doctor.status}`
        })
       user.role="doctor"
       await user.save()
  
     
        res.status(200).send({
            success:true,
            message:'Doctor status Applied Successfully',
            data:doctor
        })
        

    } catch (error) {
        res.status(404).json({
            message:error,
            success:'fail'
        })
    }
}