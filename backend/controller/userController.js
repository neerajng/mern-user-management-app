const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const cookieParser = require('cookie-parser')


const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400).json({message :'Please enter all fields.'}) 
    }
    // check if user exists
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).json({message :'User already exists'}) 
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name, 
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400).json({message :'Invalid user data'}) 
    }
})

const loginUser = asyncHandler(async(req,res) =>{ 
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user){
        res.status(400).json({message :'User Not Found'}) 
    }else if(user.isActive){
        if((await bcrypt.compare(password, user.password))){
            let token = generateToken(user._id)

            res.cookie(String(user.id),token,{
                path:'/',
                expires: new Date(Date.now() + 1000 * 30),
                httpOnly:true,
                sameSite:'lax'
            }).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                image_url:user.image_url,
                token: token,
                message :'Successfully LoggedIn' 
            })

            
        }else{
            res.status(400).json({message :'Invalid credentials '}) 
        }
    }else{
        res.status(400).json({message :'Account Is Temporarly Suspended'}) 
    }
})

// generate JWT
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '2h'
    })
}

const getUser = asyncHandler(async (req, res) => {    
    res.status(200).json(req.user)
})

const updateUser = asyncHandler(async (req, res) => {
    const user = req.user
    console.log(req.body, 'hey this is req.body in update user')
    if (!user) {
        res.status(400).json({message :'User not found'}) 
    
    }
    await user.updateOne({image_url: req.body.imageUrl});
    res.status(200).json(req.body.imageUrl)
})

module.exports = {
    getUser,
    registerUser,
    loginUser,
    updateUser,
   
}