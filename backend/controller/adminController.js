const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../model/adminModel')
const User = require('../model/userModel')

// login admin
const loginAdmin = asyncHandler(async (req, res) => {
    console.log('hey in admin login')
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (admin && password==='admin' ) {
        res.json({
            _id: admin.id,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400).json({message :'Invalid credentials'}) 
    }
})

// generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
}


// get user
const getUser = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

// update user
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400).json({message :'User not found'}) 
    }

    await user.updateOne({ isActive: !user.isActive });
    const updatedUser = await User.findById(req.params.id)

    res.status(200).json(updatedUser)
})

// search user 
const searchUser = asyncHandler(async (req, res) => {

    try {
        let searchFor = req.body.search
        console.log(searchFor, 'hey this is username')
        User.find({
            $or: [
                { name: { $regex: ".*" + searchFor + ".*", $options: "i" } },
                { email: { $regex: ".*" + searchFor + ".*", $options: "i" } }
            ]
        }).then((data) => {
            res.status(200).json(data);
            console.log(data);
        }).catch((err) => {
            console.log(err)
            res.status(400).json(err);
        });
    } catch (error) {
        console.log('search user error')
        res.status(400).json(error.message);
    }
})

// delete user
const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)


    if (!user) {
        res.status(400).json({message :'User not found'}) 
    }

    await User.deleteOne({ _id: req.params.id })

    res.status(200).json({ id: req.params.id })
})
module.exports = {
    getUser,
    loginAdmin,
    updateUser,
    deleteUser,
    searchUser
}