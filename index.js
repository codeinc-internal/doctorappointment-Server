const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const dbConfig = require('./config/dbConfig')
const userRoute = require('./Routes/userRoutes')
const doctorRoute = require('./Routes/doctorRoute')
const patientRoute = require('./Routes/patientRoute')
const conversationRoute = require('./Routes/conversationRoute')
const messageRoute=require('./Routes/messageRoute')
const app= express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('uploads'))
app.use(express.json())


const port = 4001
app.use('/api/user',userRoute)
app.use('/api/doctor',doctorRoute)
app.use('/api/patient',patientRoute)
app.use('/api/conversation',conversationRoute)
app.use('/api/message',messageRoute)

app.listen(port,()=>{
    console.log(`server is running on post ${port}`)
})