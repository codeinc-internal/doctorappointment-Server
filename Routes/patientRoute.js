const authMiddleware = require('../Middleware/authmiddleware')
const router = require('express').Router()
const multer = require('multer')
const { patientInfo } = require('../Controller/patientController')
const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../uploads')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toString+file.originalname)
    }
    
})
const upload= multer({storage:storage})



router.route('/patient').post(authMiddleware.protected,upload.single('profilePic'),patientInfo)

module.exports=router



