const router = require('express').Router()

const { CreateConversation, getCoversationWithUserId } = require('../Controller/conversation')
const authMiddleware= require('../Middleware/authmiddleware')

router.route('/').post(authMiddleware.protected,CreateConversation)
router.route('/:id').get(authMiddleware.protected,getCoversationWithUserId)


module.exports=router