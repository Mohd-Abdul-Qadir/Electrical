const mongoose = require('mongoose');

const userFormSchema = new mongoose.Schema({
        userId: {
            type: String,
        },
        consumerName: {
            type: String,
        },
        fatherName: {
            type: String,
        },
        address: {
            type: String,
        },
        subdivision: {
            type: String,
        },
        accountId: {
            type: String,
        },
        meterId: {
            type: String,
        },
        district: {
            type: String,
        },
        meterPosition: {
            type: String,
        },
        sellingBookNo: {
            type: String,
        },
        sellingPageNo: {
            type: String,
        },
        installationDate: {
            type: String,
        },
        plasticSeal: {
            type: String,
        },
        originalFileName: {
            type: String,
        },
        fileName: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
});


module.exports = mongoose.model("UserForm",userFormSchema);