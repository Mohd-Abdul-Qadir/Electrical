const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.refreshToken = async (req,res) => {
    try {
        const {refreshToken} = req.body
        if (!refreshToken) {
            return res.json({message: "Unauthorized"}).status(422)
        }
        const jwtData = await jwt.verify(refreshToken,process.env.REFRESEH_KEY)
        if (!jwtData) {
            return res.json({message: "Unauthorized"}).status(401)
        }
        const payload = {user:jwtData.user}

    
        let accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 30*60 })
        let RefreshToken = jwt.sign(payload, process.env.REFRESEH_KEY, { expiresIn: 35*60*60 })
        return res.json({message:"session refreshed",accessToken: accessToken, refreshToken: RefreshToken,type: jwtData.user.type}).status(200)
    } catch (err) {
        return res.json({message:err.message})
    }
}