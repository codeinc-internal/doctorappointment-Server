const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connection is successful')
}).catch((err)=>console.log(` connection failed ${err}`))

module.exports = mongoose