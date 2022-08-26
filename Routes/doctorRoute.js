const { getDoctor, updateDoctor, ApprovedAppointment } = require('../Controller/DoctorController')
const authMiddleware = require('../Middleware/authmiddleware')
const router = require('express').Router()




router.route('/getDoctor/:id').get(getDoctor)
router.route('/updateDoctor/:id').put(authMiddleware.protected,updateDoctor)
router.route('/approvedAppointment/:id').post(authMiddleware.protected,authMiddleware.restrictTo('doctor'),ApprovedAppointment)

module.exports=router