const { taskModel } = require('../models/taskModel')
const { getTodayObject } = require('../date_and_time/dateTime')

const getDashTask = async (req, res) => {
    try {
        const { accountId } = req.body
        const { dateString } = getTodayObject()

        // 1. Fetch the tasks
        const allDashTaskInfo = await taskModel.find({ 
            accountId: accountId, 
            "taskDueDates.dueDate": dateString 
        }).populate([
            { path: 'topicId', select: 'topicName -_id' },
            { path: 'subjectId', select: 'subjectName -_id' }
        ])

        // 2. Extract IDs and update restoreDate for these specific tasks
        if (allDashTaskInfo.length > 0) {
            const taskIds = allDashTaskInfo.map(task => task._id)
            await taskModel.updateMany(
                { _id: { $in: taskIds } },
                { $set: { restoreDate: dateString } }
            )
        }

        return res.status(200).json({ 
            msg: 'Dashboard task fetch successful and restoreDate updated', 
            allDashTaskInfo, 
            dateString 
        })

    } catch (error) {
        console.log(`Controllers-dashboardController-getDashTask Error: ${error}`)
        return res.status(500).json({ msg: 'Internal server error' })
    }
}

const markDashTask = async (req, res) => {
    try {
        const { taskId } = req.body
        const { dateString } = getTodayObject()
        const markedTaskInfo = await taskModel.updateOne(
            { _id: taskId, "taskDueDates.dueDate": dateString },
            { $set: { "taskDueDates.$.isCompleted": true } }
        )

        return res.status(200).json({ msg: 'Task marked successfully', markedTaskInfo })
    } catch (error) {
        console.log(`Controllers-dashboardController-markDashTask Error: ${error}`)
        return res.status(500).json({ msg: 'Internal server error' })
    }
}

module.exports = { getDashTask, markDashTask }
