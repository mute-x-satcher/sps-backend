const { taskModel } = require('../models/taskModel')
const {getTodayObject} = require('../date_and_time/dateTime')
const getDashTask = async (req,res) => {
    try {
        console.log(req.body)
        const {accountId} = req.body
        const {dateString} = getTodayObject()
        // console.log(dateString)
        const allDashTaskInfo = await taskModel.find({accountId: accountId,"taskDueDates.dueDate":dateString}).populate([
            {path: 'topicId',select: 'topicName -_id'},
            {path: 'subjectId', select: 'subjectName -_id'}])
        
        console.log(allDashTaskInfo)
        return res.status(200).json({msg: 'Dashboard task fetch successful',allDashTaskInfo,dateString})

    } catch (error) {
         console.log(`Controllers-dashboardController-getDashTask Error: ${error}`);
    }
}

const markDashTask = async (req,res) => {
    try {
        const {taskId} = req.body
        const {dateString} = getTodayObject()
        const markedTaskInfo = await taskModel.updateOne(
            {_id: taskId,"taskDueDates.dueDate":dateString},
            {$set:{"taskDueDates.$.isCompleted": true}}) 

        return res.status(200).json({msg: 'Task marked successfully',markedTaskInfo})
    } catch (error) {
        console.log(`Controllers-dashboardController-markDashTask Error: ${error}`);
    }
}

module.exports = {getDashTask,markDashTask}