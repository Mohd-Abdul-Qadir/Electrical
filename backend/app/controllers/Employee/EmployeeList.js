const User = require('../../models/User')

exports.getEmployees = async (req,res) => {
    try {
        let employees = []
        employees = await User.find({type:2})
        return res.json({employees : employees}).status(200)   
    } catch (err) {
        console.log(err.message)
    }
}
exports.deleteEmployee = async (req,res) => {
    try {
        if (req.body.employeeId == null) {
            return res.json("Error").status(200)
        }
        await User.deleteOne({_id:req.body.employeeId})
        return res.json("Employee deleted successfully").status(200)
    } catch (e) {
        console.log(e.message)
    }
}