const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../../models/User')
const { validationResult } = require('express-validator')
require('dotenv').config()

exports.login = async (req,res) => {
    try {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            console.log(error.array()[0].msg)
            return res.json({
                error : error.array()[0].msg
            }).status(422)
        }
        let {email,password} = req.body
        console.log("----------------------")
        console.log(req.body)
        console.log("---------------------------")
        let user = await User.findOne({email:email})
        if(!user) {
            return res.json({message:"Invalid login credentials"}).status(422)
        }
        
        let verifyPassword = await bcrypt.compare(password,user.password)
        if(!verifyPassword) {
            return res.json({message:"Invalid login credentials"}).status(422)
        }
        const payload = {
            user: {
                id:user._id,
                name: user.name,
                email: user.email,
                type: user.type
            },
        }
        let accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 30*60 })
        let refreshToken = jwt.sign(payload, process.env.REFRESEH_KEY, { expiresIn: 35*60*60 })
        return res.json({message:"Login successfuly",accessToken: accessToken, refreshToken: refreshToken,type:user.type,name:user.name,email:user.email,userId:user._id}).status(200)   
    } catch (err) {
        console.log(err.message)
    }
}