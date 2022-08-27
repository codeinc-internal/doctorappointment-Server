const Message = require("../Model/messageModel")

module.exports.addMessage=async(req,res)=>{
    const newMessage = new Message(req.body)
    try{
           const savedMessage = await newMessage.save()
           res.status(200).json({
            success:'true',
            data:{
                savedMessage
            }           
        })
    }
    catch(error){
        res.status(500).json({
            success:'fail',
            message:error
        })
    }

}
module.exports.getMessage=async(req,res)=>{
    try {
        const message = await Message.find({
            conversationId:req.params.id
        })
        res.status(200).json({
            success:'true',
            data:{
                message
            }
        })
    } catch (error) {
        res.status(500).json({
            success:'fail',
            message:error
        })
    }
}