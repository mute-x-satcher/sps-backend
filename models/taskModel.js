const mongoose = require('mongoose');

const dueDates = mongoose.Schema({
    dueDate:{
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        default: false,
        required: true,
    }
},{_id: false})

const taskSchema = mongoose.Schema({
      taskName:{
        type: String,
        required: true
      },
      taskType:{
        type: String,
        required: true
      },
      topicId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'topics'
      },
      subjectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'subjects'
      },
      accountId:{
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      taskDescription:{
        type: String,
        max: 500
      },
      taskDueDates:{
        type: [dueDates],
        required: true
      },
      createdAt:{
        type: String,
        required: true
      }  
})

const taskModel = mongoose.model('tasks',taskSchema)

module.exports = {taskModel}