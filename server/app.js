const express = require('express')
const app = express()
app.use(express.json())
const mongoose = require('mongoose')
require("dotenv").config()
const userRouter = require('./controllers/userManagement')


mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB')
})

app.use("/api",userRouter)

app.listen(process.env.PORT,() => {
    console.log(`Server started at port ${process.env.PORT}`)
})