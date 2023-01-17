const {validationResult} = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')

exports.register = async (req,res) =>{
    try {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            console.log(error.array()[0].msg)
            return res.json({
                error : error.array()[0].msg
            }).status(422)
        }
        let {name,email,password} = req.body;
        console.log(req.body)
        
        let existingUser = await User.findOne({email:email});
        
        if(existingUser) {
            return res.json({message:"User already registered"}).status(422)
        }
        let hash = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password,hash)
        let newUser = User({
            name:name,
            email:email,
            password:password,
            type: 2
        })
        await newUser.save()
        return res.json({message:"User registered successfully"}).status(200)
    } catch (err) {
        console.log(err.message);
    }
}