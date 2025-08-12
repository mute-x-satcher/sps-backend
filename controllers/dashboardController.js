const { taskModel } = require('../models/taskModel')
const {getTodayObject} = require('../date_and_time/dateTime')
const getDashTask = async (req,res) => {
    try {
        const {dateString} = getTodayObject()
        // console.log(dateString)
        const allDashTaskInfo = await taskModel.find({"taskDueDates.dueDate":dateString}).populate([
            {path: 'topicId',select: 'topicName -_id'},
            {path: 'subjectId', select: 'subjectName -_id'}])
        
        console.log(allDashTaskInfo)
        return res.status(200).json({msg: 'Dashboard task fetch successful',allDashTaskInfo})

    } catch (error) {
         console.log(`Controllers-dashboardController-getDashTask Error: ${error}`);
    }
}

module.exports = {getDashTask}