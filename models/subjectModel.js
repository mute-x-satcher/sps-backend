const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
    subjectName:{
        type: String,
        required: true,
    },
    accountId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

const subjectModel = mongoose.model('subjects',subjectSchema)

module.exports = {subjectModel}