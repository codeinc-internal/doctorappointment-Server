const hash = require('hash')
const path = require('path')
const authMiddleware = require('../Middleware/authmiddleware')
const router = require('express').Router()
const multer = require('multer')
const { patientInfo, getEprescription } = require('../Controller/patientController')
const { Hash } = require('crypto')
const storage= multer.diskStorage({
    destination: (req, file, callback) => { //this is storing the file in the images folder
        callback(null, path.join(__dirname, '../uploads'));
    },

    filename: (req, file, callback) => { //this is just setting a unique filename
       
        callback(null, Date.now() + file.originalname);
    }
});
const upload= multer({storage:storage})



router.route('/').post(authMiddleware.protected,upload.single('profilePic'),patientInfo)
router.route('/getPrescription').get(authMiddleware.protected,getEprescription)

module.exports=router



