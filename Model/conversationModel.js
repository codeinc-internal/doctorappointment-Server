const mongoose = require('mongoose')
const conversationSchema = new mongoose.Schema({
        member :{
            type:Array
        }
},{
    timestamps:true
})


const Conversation = mongoose.model('Conversation',conversationSchema)
module.exports=Conversation