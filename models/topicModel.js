const mongoose = require('mongoose')

const topicSchema = mongoose.Schema({
    topicName:{
        type: String,
        required: true,
    },
    subjectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    })

const topicModel = mongoose.model('topics',topicSchema)

module.exports = {topicModel}