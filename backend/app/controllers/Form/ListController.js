const UserForm = require("../../models/UserForm");


exports.listAll = async(req,res) => {
    list = await UserForm.find({userId:req.body.id})
    let i = list.length;
    let response = []
    list.forEach(e => {
        response.unshift({...e._doc,id: i--})
    });
    res.json(response,200);
}