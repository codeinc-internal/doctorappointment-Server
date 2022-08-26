
const { changeDoctorStatus } = require('../Controller/adminController')
const { getAllDoctor, getDoctor } = require('../Controller/DoctorController')
const { SignUp, verifyOpt, Login, getAllUser, ApplyForDoctor, markSeenNotification, deleteNotification, bookAppointment, getAppointment  } = require('../Controller/userController')
const authMiddleware = require('../Middleware/authmiddleware')

const router = require('express').Router()

router.route("/signUp").post(SignUp)
router.route('/signUp/verify').post(verifyOpt)
router.route("/Login").post(Login)
router.route('/Get-All-User').get(authMiddleware.protected,authMiddleware.restrictTo('admin'),getAllUser)
router.route('/Get-All-Doctor').get(authMiddleware.protected,getAllDoctor)

router.route('/ApplyForDoctor').post(authMiddleware.protected,ApplyForDoctor)
router.route('/SeenNotification').post(authMiddleware.protected,markSeenNotification)
router.route('/deleteNotification').post(authMiddleware.protected,deleteNotification)


router.route('/Approved/:id').post(authMiddleware.protected,authMiddleware.restrictTo('admin'),changeDoctorStatus)
router.route('/BookAppointment').post(authMiddleware.protected,authMiddleware.restrictTo('user'),bookAppointment)
router.route('/getAppointment').get(authMiddleware.protected,getAppointment)



module.exports= router