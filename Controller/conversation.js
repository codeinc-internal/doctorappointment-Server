const Conversation = require("../Model/conversationModel")

module.exports.CreateConversation=async(req,res)=>{
    const newConversation = new Conversation({
        member:[req.body.senderId,req.body.receiverId]
    })
    try {
        const savedConversation = await newConversation.save()
        res.status(200).json({
            success:'true',
            savedConversation
        })
    } catch (error) {
        res.status(500).send({
            success:'fail',
            message:error
        })
    }

}
module.exports.getCoversationWithUserId=async(req,res)=>{
    try {
        const conversation = await Conversation.find({
            member:{$in:[req.user._id]}
        })
        res.status(200).json({
            success:'true',
            data:{
                conversation
            }
        })
    } catch (error) {
        res.status(500).send({
            success:'fail',
            message:error
        })
    }
}