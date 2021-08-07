const asyncHandler = require('express-async-handler')
const pool = require('../config/db')

const authOnly = asyncHandler(async(req,res,next)=> {
    if(!req.session.userId) {
        res.status(401)
        throw new Error("Session cookie missing.")
    }
    next()
})

module.exports = {authOnly}