const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const adminRouter = require('./routes/adminRoutes');
const usersRouter = require('./routes/userRoutes');

const connectDB = require('./config/db')
connectDB()

const cors=require("cors");
const cookieParser = require('cookie-parser');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

const app = express()

app.use(cookieParser())
app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/users', usersRouter)
app.use('/api/admin', adminRouter)

app.listen(port, ()=> console.log(`server started on port ${port}`))