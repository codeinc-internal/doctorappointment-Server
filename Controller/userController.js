const bcrypt = require('bcrypt')
const _ = require('lodash')
const axios= require('axios')
const optgenerator= require('otp-generator')
const {User}=require('../Model/userModel')
const {Otp} =require('../Model/optModel')
const {Doctor} = require('../Model/doctorModel')
const Appointment = require('../Model/appointmentModel')
const moment = require('moment')

const accountSID= process.env.ACCOUNTSID
const authSID=process.env.AUTHSID
const client= require('twilio')(accountSID,authSID)

module.exports.SignUp = async(req,res)=>{
        const user = await User.findOne({
            number : req.body.number
        });
        if(user) return res.status(400).send('User already exist')
        const OTP = optgenerator.generate(6,{
            digits:true,lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false
        })
        const number = req.body.number;
       
        
        const otp = new Otp({number:number,otp:OTP})
        await client.messages.create({
            to:req.body.number,
            from:'+19804857476',
            body:` YOUR OTP CODE IS ${OTP} it will expires in 5 mint`
        }).then((message)=>console.log(message.sid)).catch((err)=>{
            res.status(404).send({
                message:err,
                success:false
            })})
        
        const result = await otp.save()
        return res.status(200).send({message:'Otp send successfully', OTP})
}
module.exports.verifyOpt= async (req,res)=>{
        const otpHolder = await Otp.find({
            number:req.body.number
        })
        if(otpHolder.length===0) return res.status(400).send('you use an Expired OTP')
        const rightOtp = otpHolder[otpHolder.length-1]
        console.log(rightOtp)
        if(rightOtp.otp===req.body.otp){
            const user = new User(_.pick(req.body,['number']))
            const token = user.generateJWT();
            const result = await user.save()
            const Otpdelete= await Otp.deleteMany({
                number:rightOtp.number
        })
        return res.status(200).send({
            message:'User Registration Successful!',
            token:token,
            data:result
        })
        }
        else{
            return res.status(400).send('error')
        }
}
module.exports.Login= async (req,res)=>{
    try{
        const  user = await User.findOne({
            number:req.body.number
        })
        if(!user){
            res.status(404).send('wrong credientions')
        }
        const token = user.generateJWT()
        res.status(200).send({
            message:'success',
            data:user,
            token:token
        })
    }catch(err){
        res.status(404).send(err)
    }
}
module.exports.getAllUser =  async(req,res)=>{
    try{
        const users = await User.find()
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
module.exports.ApplyForDoctor= async(req,res)=>{
    try{
    const doctor = new Doctor({...req.body,userId:req.user._id})
    
    const adminUser = await User.findOne({role:"admin"})
    // for notification
    const UnseenNotification = adminUser.unseenNotification

    UnseenNotification.push({
      type:"Doctor-Request",
      message:`${doctor.firstname} ${doctor.lastname} has applied for doctor request`,
      data:{
            doctorId:doctor._id,
            name:doctor.firstname+' '+doctor.lastname
      }
    })
   const updateAdmin= await User.findByIdAndUpdate(adminUser._id,{unseenNotification:UnseenNotification},{
        new:true,
        runValidators:true
    })
    await doctor.save()
    
   
    res.status(200).send({
        success:'true',
        message:'Applied for Doctor account successful',
        data:updateAdmin

    })

    }catch(err){
        res.status(500)
            .send({message:'Error applying for doctor account', success:false,err})
    }
}
module.exports.markSeenNotification= async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.user._id})
        const unseenNotification= user.unseenNotification
        const seenNotification= user.seenNotification
        seenNotification.push(...unseenNotification)
        user.unseenNotification=[]
        user.seenNotification=seenNotification
        await user.save()
        res.status(200).send({
            success:'true',
            message:'All Notification marked as Seen'
        })

    }catch(err){
        res.status(500)
        .send({message:'Error', success:false,err})
    }
}
module.exports.deleteNotification= async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.user._id})
        user.seenNotification=[]
        user.unseenNotification=[]
        const updateUser = await user.save()
        res.status(200).send({
            success:'true',
            message:'All Notification Deleted'
        })

    }catch(err){
        res.status(500)
        .send({message:'Error', success:false,err})
    }
}

module.exports.bookAppointment= async(req,res)=>{
    try {
        const  appointment = new Appointment({...req.body,userId:req.user._id})
        await appointment.populate({
            path:'doctorId',
            select:'firstname'
        })
        
       

        await appointment.save()
        const doctor = await Doctor.findById(req.body.doctorId)
       const  toString = String(doctor.userId) 
       const user = await User.findById(toString)
       const unseenNotification = user.unseenNotification
       unseenNotification.push({
            type:"Appointment Booking",
            message:"you have an Appointment to book"
        })       

        
        
        await user.save()
        res.status(200).send({
            success:'true',
            message:'Appointment booked successfully',
            data:{
                appointment
            },
            user
        
        })
       
    } catch (error) {
        res.status(500)
        .send({message:'Error', success:false,error})
    }
}
module.exports.CheckAvaibility= async(req,res)=>{
    try {
       const date = moment(req.body.date,'DD-MM-YYYY').toISOString()
       const doctorId = req.body.doctorId
       const appointment = await Appointment.find({
        doctorId,
        date,
        status:"approved"
       })
       if(appointment.length>0){
        return res.status(200).send({
            message:'Appointment not avaible ',
            success:"fail"
        })
       }
        
        
       
        res.status(200).send({
            success:'true',
            message:'Appointment booked successfully'
        })
       
    } catch (error) {
        res.status(500)
        .send({message:'Error', success:false,error})
    }
}
module.exports.getAppointment = async (req,res)=>{
    try {
        const appointment = await Appointment.find({userId:req.user._id}).populate({path:'doctorId', select:'firstname'})
        
        res.status(200).send({
            success:'true',
            message:'Appointments',
            data:{
                appointment
            }
        })
    } catch (error) {
        res.status(500)
        .send({message:'Error', success:false,error})
    }
}