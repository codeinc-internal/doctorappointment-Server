const jwt = require('jsonwebtoken')
const {  User } = require('../Model/userModel')

const protected = async(req,res,next)=>{
    let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token,process.env.JWT_SECRET)

      
      req.user = await User.findById(decoded._id)

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
         .json({
        status:'fail',
        message:'you dont have permission to perform this task'
    })
    }
  }

  if (!token) {
    res.status(401)
       .json({
        status:'fail',
        message:'you dont have permission to perform this task'
    })
  }
}
const restrictTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(403)
            .json({
                status:'fail',
                message:'you dont have permission to perform this task'
            })
        }
        next() 
    }
}
module.exports={protected , restrictTo}