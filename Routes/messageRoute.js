const router = require('express').Router()


const { addMessage, getMessage } = require('../Controller/message')
const authMiddleware = require('../Middleware/authmiddleware')
router.route('/').post(authMiddleware.protected,addMessage)
router.route('/:id').get(authMiddleware.protected,getMessage)

module.exports=router
