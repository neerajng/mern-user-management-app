const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const Admin = require('../model/adminModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // In headers token will be in the form of :- Bearer token post man authorization 
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user, 'this is User in protect(verify token)')

            if (!req.user) {
                req.admin = await Admin.findById(decoded.id).select('-password')
            }
            next()

        } catch (error) {
            console.log(error)
            // 401 - not authorized
            res.status(401)
            throw new Error('Not Authorized')

        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized', 'No token')
    }
})

module.exports = { protect }