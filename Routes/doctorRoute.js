const { getDoctor, updateDoctor, ApprovedAppointment, e_prescription } = require('../Controller/DoctorController')
const authMiddleware = require('../Middleware/authmiddleware')
const router = require('express').Router()




router.route('/getDoctor/:id').get(getDoctor)
router.route('/updateDoctor/:id').put(authMiddleware.protected,updateDoctor)
router.route('/approvedAppointment/:id').post(authMiddleware.protected,authMiddleware.restrictTo('doctor'),ApprovedAppointment)
router.route('/presrciption/:id').post(authMiddleware.protected,authMiddleware.restrictTo('doctor'),e_prescription)

module.exports=router